import axios from 'axios'
import { TagMaster } from './tagMaster.js'
import Fuse from 'fuse.js'
export class Index {
  constructor() {
    this.tagFuseOptions = {
      keys: ['tag'],
      shouldSort: true,
      threshold: 0.4,
    }
    this.cardFuseOptions = {
      keys: ['tag'],
      shouldSort: true,
      threshold: 0.4,
    }
    this.tagMaster = new TagMaster()
    this.initView()

  }
  initDefaults() {
    //wrapping for easy fuzzy search
    this.tagFuseTags = this.tagMaster.getAllTags().map(t => {
      return {
        tag: $(t).text(),
        htmlRef: t
      }
    })
    this.users.forEach(u => {
      u.projects.forEach(p => {
        p.tags = p.conceptTags.concat(p.techStackTags);
        p.userData = {
          _id: u._id,
          department: u.department,
          displayName: u.displayName,
          jobTitle: u.jobTitle,
        }
        this.projectList.push(p)

        p.tags
          .forEach((t) => {
            if (this.relDict.hasOwnProperty(t)) {
              this.relDict[t].push(p);
            } else {
              this.relDict[t] = [p];
            }
          })
      })
    })
  }
  initView() {
    let that = this
    let conceptTagHtml = this.tagMaster.buildTags('conceptTags', 'concept'),
      techStackTagHtml = this.tagMaster.buildTags('techStackTags', 'techStack')
    $('#conceptTagContainer').append(conceptTagHtml)
    $('#techStackTagContainer').append(techStackTagHtml)
    //These are the mandatory handles that add selected tags to array
    this.tagMaster.addHandles()
    this.getAggregateUsersAndProjects().then(usersAndProjects => {
      this.users = usersAndProjects
      this.projectList = []
      this.relDict = {};
      this.initDefaults();
      this.tagFuse = new Fuse(this.tagFuseTags, this.tagFuseOptions)
      console.log(this)

      this.buildAndAppendProjectCards()

    })
    this.handles()
  }

  getAggregateUsersAndProjects() {
    return new Promise((resolve, reject) => {
      axios
        .post('/getAggregateUsersAndProjects')
        .then(res => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            //filler
            console.log('FAILED', res)
            resolve(res.data);
          }
        })
        .catch(err => {
          console.log('ERROR in request runner login', err)
          resolve(err)
        })
    })
  }
  buildAndAppendProjectCards() {
    let that = this;
    $('#filteredProjects').empty();
    let projectCards = this.buildProjectCards();
    $('#filteredProjects').append(projectCards);
    // Modal Contents Functions
    $('.card').on('click', el => {
      let projectId = $(el.target).closest('.card').attr('data-projectId'),
        userId = $(el.target).closest('.card').attr('data-userId'),
        project = that.findProjectById(projectId),
        timeDist = project.timeDistribution,
        user = that.findUserById(userId),
        modal = $('#projectModal'),
        tagList = '';

      project.conceptTags.forEach(t => {
        tagList += `<li><a href="#">${t}</a></li>`
      })
      project.techStackTags.forEach(t => {
        tagList += `<li><a href="#">${t}</a></li>`
      })

      modal.find('.projectModal__title').text(project.title)
      modal.find('.projectModal__orgName').text(user.department)
      modal.find('#projectDescription').text(project.description)
      modal.find('.projectModal__tagList').html(`<ul id='cardTagList' class="card__tagList">` + tagList +
        `</ul>`)
      modal.find('#name').text('Name: ' + user.displayName);
      modal.find('#upn').text('Email: ' + user.upn);
      modal.find('#meetingTime').text('Meeting Time: ' + timeDist.meetingTime);
      modal.find('#devTime').text('Dev Time: ' + timeDist.devTime);
      modal.find('#writingTime').text('Writing Time: ' + timeDist.writingTime);
      modal.find('#designTime').text('Design Time: ' + timeDist.designTime);
      modal.find('#emailTime').text('Email Time: ' + timeDist.emailTime);
      console.log(project);
      modal.modal({})
    })

    $('.card').on('click', (el) => {
      $('#projectModal').modal();
    })
    $('.cardTags').on('click', (el) => {
      el.preventDefault();
      console.log("yoyoyyo");
    })
  }
  findProjectById(id) {
    return this.projectList.find(p => {
      if (p._id === id) {
        return p
      }
    })
  }
  findUserById(id) {
    return this.users.find(u => {
      if (u._id === id) {
        return u
      }
    })
  }
  sortHtmlTags(alphaSort) {
    let searchText = $('#mainSearchBar').val().trim(),
        searchResults = this.tagFuse.search(searchText).reverse();
    if ( alphaSort ) { searchResults = this.tagFuseTags.reverse(); }
    searchResults.forEach((s) => {
      if ($(s.htmlRef).attr('data-type') === 'concept') {
        $('#conceptTags').find('ul').prepend(s.htmlRef)
      } else if ($(s.htmlRef).attr('data-type') === 'techStack') {
        $('#techStackTags').find('ul').prepend(s.htmlRef)
      }
    })
  }
  sortHtmlCards() {
    let searchText = $('#mainSearchBar').val().trim(),
      invSearchResults = this.tagFuse.search(searchText).reverse();
    invSearchResults.forEach((s) => {
      if ($(s.htmlRef).attr('data-type') === 'concept') {
        $('#conceptTags').find('ul').prepend(s.htmlRef)
      } else if ($(s.htmlRef).attr('data-type') === 'techStack') {
        $('#techStackTags').find('ul').prepend(s.htmlRef)
      }
    })
  }
  showOnlyProjects(ids) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    }

    //console.log(ids)
    $('#filteredProjects')
      .find('.card')
      .toArray()
      .forEach(card => {
        let cardId = $(card).attr('data-projectId')
        if (!ids.includes(cardId)) {
          $(card).remove()
        }
      })
  }
  buildProjectCards() {
    let that = this
    function buildCard(p) {
      function buildTagList(projectTags) {
        let html = ''
        projectTags.forEach(t => {
          html += `<li class="cardTags"><a href="#">${t}</a></li>`
        })
        return html
      }
      let tagList = '',
        userData = p.userData;
      if (p.conceptTags.length > 0 || p.techStackTags.length > 0) {
        let cardTags = p.conceptTags.concat(p.techStackTags)
        //console.log(cardTags);
        tagList = buildTagList(cardTags)
      }
      let html = `<div class="card" data-userId=${
        userData._id
        } data-projectId=${p._id}>
         <div class="card__container">
            <div class="card__orgName">${userData.department}</div>
            <div class="card__projectTitle"><a href="#">${p.title}</a></div>
            <div class="card__projectDescrip">${p.description}</div>
            <div class="tagListWraper">
            <ul id='cardTagList' class="card__tagList">
                ${tagList}
            </ul>
            </div>
            <div class="card__footer">
               <img class="card__authorImage" src="media/soAnonymous.png">
               <div class="card__authorName">${userData.displayName}, ${
        userData.jobTitle
        }</div>
            </div>
         </div>
      </div>`
      return html
    }
    // function buildHtmlProjectCards(user) {
    //
    //   let projects = user.projects
    //   let cards = projects.map(p => buildCard(userCardData, p))
    //   return cards
    // }

    let cards = that.projectList.map(p => buildCard(p))
    let mergedCards = [].concat.apply([], cards)
    let html = ''
    mergedCards.forEach(c => {
      html += c
    })
    return html
  }
  getCurrentFilterTagText() {
    let tags = this.tagMaster.getTagsIn('filterTags').map(t => {
      return $(t).text()
    })
    return tags
  }
  assignRelevanceScore() {
    let filterTags = this.getCurrentFilterTagText();
    for (let tag in this.relDict) {
      let projectList = this.relDict[tag];
      projectList.forEach((p) => {
        p.relScore = 0;
        filterTags.forEach((t) => {
          if (p.tags.includes(t)) {
            p.relScore++;
          }
        })
      })
    }
  }
  sortByRelevanceScore() {
    this.projectList = this.projectList.sort((a, b) => {
      if (a.relScore < b.relScore) {
        return 1;
      } else {
        return -1
      }
    })

  }




  handles() {
    //If a tag is clicked and it does not exist in the filterTags area then I recreate it there
    let that = this
    function handleFilterTagClick(el) {
      el.preventDefault()
      let liElem = $(el.target).closest('li'),
        tagDataVal = $(el.target)
          .closest('li')
          .attr('data-value')
      $(liElem).remove()
      that.tagMaster.getAllTags().find(t => {
        if ($(t).attr('data-value') === tagDataVal) {
          $(t).removeClass('selected-tag')
          return t
        }
      })
    }
    function handleNewFilterTag() {
      that.assignRelevanceScore();
      that.sortByRelevanceScore();
      that.buildAndAppendProjectCards();
    }

    function handleTagPlacement(tag) {
      let tagType = $(tag).attr('data-type'),
        tagDataValue = $(tag).attr('data-value')

      let allSelected = that.tagMaster.getSelected(),
        selectedTags =
          tagType === 'concept'
            ? allSelected.selectedConceptTags
            : allSelected.selectedTechStackTags,
        currentFilterTags = that.tagMaster.getTagsIn('filterTags')

      let foundTag = currentFilterTags.find(t => {
        if ($(t).attr('data-value') === tagDataValue) {
          return t
        }
      })

      if (foundTag) {
        $(foundTag).remove()
        //console.log('removed', tagDataValue)
      } else {
        //console.log('current filter tags:', currentFilterTags)
        let filterTag = $(tag.outerHTML)
        filterTag.removeClass('selected-tag')
        $('#filterTags')
          .find('ul')
          .append(filterTag)
        $(filterTag).on('click', handleFilterTagClick)
      }
    }

    this.tagMaster.getAllTags().forEach(tag => {
      $(tag).on('click', el => {
        handleTagPlacement(tag)
        handleNewFilterTag();
      })
    })


    $('#mainSearchBar').on('keyup', (el) => {
      let text = $('#mainSearchBar').val()
      if (text.length > 0) {
        that.sortHtmlTags();
        that.sortHtmlCards();
      } else { that.sortHtmlTags({alpha : true})}
    })

  }
}
