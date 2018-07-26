import axios from 'axios';
import { TagMaster } from './tagMaster.js'
import Fuse from 'fuse.js'
export class Index {

  constructor() {

    this.fuseOptions = {
      id: '_id',
      keys: ['techStackTags', 'conceptTags']
    }
    this.tagMaster = new TagMaster();
    this.initView();
  }
  initView() {
    let conceptTagHtml = this.tagMaster.buildTags('conceptTags', 'concept'),
      techStackTagHtml = this.tagMaster.buildTags('techStackTags', 'techStack');
    $('#conceptTagContainer').append(conceptTagHtml);
    $('#techStackTagContainer').append(techStackTagHtml);
    //These are the mandatory handles that add selected tags to array
    this.tagMaster.addHandles();
    this.getAggregateUsersAndProjects().then((usersAndProjects) => {
      usersAndProjects.forEach((u) => {
        u.tags = [];
        u.projects.forEach((p) => {
          u.tags = u.tags.concat(p.conceptTags);
          u.tags = u.tags.concat(p.techStackTags);
        })
      })
      this.users = usersAndProjects;
      console.log(this.users);
      this.projectList = [];
      usersAndProjects.forEach((user) => {
        user.projects.forEach((project) => {
          this.projectList.push(project);
        })
      });
      this.fuse = new Fuse(this.projectList, this.fuseOptions)
      console.log(this);

      let projectCards = this.buildProjectCards();
      $('#filteredProjects').append(projectCards);
    })
    this.handles();
  }
  getAggregateUsersAndProjects() {
    return new Promise((resolve, reject) => {
      axios.post('/getAggregateUsersAndProjects')
        .then((res) => {
          if (res.statusText === 'OK') {
            resolve(res.data);
          } else {
            console.log("FAILED", res);
          }
        }).catch((err) => {
          console.log("ERROR in request runner login", err);
          resolve(err);
        })
    })
  }

  findProjectById(id) {
    return this.projectList.find((p) => {
      if (p._id === id) {
        return p;
      }
    })
  }

  showOnlyProjects(ids) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    console.log(ids);
    $('#filteredProjects').find('.card').toArray().forEach((card) => {
      let cardId = $(card).attr('data-projectId');
      if (!ids.includes(cardId)) {
        let forDemo = getRandomInt(10);
        if (forDemo < 4) {
          $(card).remove()
        }
      }
    })
  }

  buildProjectCards() {
    let that = this;
    function buildCard(userData, p) {
      function buildTagList(projectTags) {
        let html = '';
        projectTags.forEach((t) => {
          html += `<li><a href="#">${t}</a></li>`
        })
        return html;
      }
      let tagList = '';
      if (p.conceptTags.length > 0 && p.techStackTags.length > 0) {
        tagList = buildTagList(p.conceptTags.concat(p.techStackTags));
      }
      let html = `<div class="card" data-userId=${userData._id} data-projectId=${p._id}>
         <div class="card__container">
            <div class="card__orgName">${userData.department}</div>
            <div class="card__projectTitle"><a href="#">${p.title}</a></div>
            <div class="card__projectDescrip">${p.description}</div>
            <ul class="card__tagList">
                ${tagList}
            </ul>
            <div class="card_footer">
               <img class="card__authorImage" src="media/soAnonymous.png">
               <div class="card__authorName">${userData.displayName}, ${userData.jobTitle}</div>
            </div>
         </div>
      </div>`
      return html;
    }
    function buildHtmlProjectCards(user) {
      let userCardData = {
        _id: user._id,
        department: user.department,
        displayName: user.displayName,
        jobTitle: user.jobTitle
      }
      let projects = user.projects;
      let cards = projects
        .map(p => buildCard(userCardData, p))
      return cards;
    }
    let cardArrays = this.users.map(u => buildHtmlProjectCards(u))
    let mergedCards = [].concat.apply([], cardArrays);
    let html = '';
    mergedCards.forEach((c) => { html += c; })
    return html;
  }

  getCurrentFilterTagText() {
    let tags = this.tagMaster.getTagsIn('filterTags').map((t) => {
      return $(t).text();
    })
    return tags;
  }

  handles() {
    //If a tag is clicked and it does not exist in the filterTags area then I recreate it there
    let that = this;
    function handleFilterTagClick(el) {
      el.preventDefault()
      let liElem = $(el.target).closest('li'),
        tagDataVal = $(el.target).closest('li').attr('data-value');
      $(liElem).remove()
      that.tagMaster.getAllTags().find((t) => {
        if ($(t).attr('data-value') === tagDataVal) {
          $(t).removeClass('selected-tag')
          return t;
        }
      })
    }

    function handleTagPlacement(tag) {
      let tagType = $(tag).attr('data-type'),
        tagDataValue = $(tag).attr('data-value');

      let allSelected = that.tagMaster.getSelected(),
        selectedTags = tagType === 'concept' ? allSelected.selectedConceptTags : allSelected.selectedTechStackTags,
        currentFilterTags = that.tagMaster.getTagsIn('filterTags');

      let foundTag = currentFilterTags.find((t) => {
        if ($(t).attr('data-value') === tagDataValue) {
          return t;
        }
      })

      if (foundTag) {
        $(foundTag).remove();
        console.log("removed", tagDataValue)

      } else {
        console.log("current filter tags:", currentFilterTags)
        let filterTag = $(tag.outerHTML);
        filterTag.removeClass('selected-tag')
        $('#filterTags').find('ul').append(filterTag)
        $(filterTag).on('click', handleFilterTagClick);
      }
    }

    this.tagMaster.getAllTags().forEach((tag) => {
      $(tag).on('click', (el) => {
        handleTagPlacement(tag);
        let currentFilterTags = that.getCurrentFilterTagText(),
          fuseSearchString = currentFilterTags.join(' ');
        console.log(fuseSearchString);
        let returnIds = that.fuse.search(fuseSearchString);
        that.showOnlyProjects(returnIds);
      })
    })

    $('.card').on('click', () => {
      console.log("here")
      // let modalTitle = 
      $('#myModal').modal({})
    })


  }
}
