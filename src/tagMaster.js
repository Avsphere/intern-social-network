export class TagMaster {

  constructor() {
    this.conceptList = [
      "gaming", "mixed reality", "virtual reality", "augmented reality", "accessibility", "supportability", "artificial intelligence", "machine learning", "IOT", "big data", "security", "natural language processing", "speech recognition", "ux/ui", "merchandising", "design", "data storage", "blockchain", "education", "automation",
      "networking", "anomaly detection", "distributed systems", "event sourcing"
    ];
    this.techStackList = [
      "unity", "javascript", "jquery", "django", "go", "objective c", "backbone.js", "powershell", "c#", "asp.net", "kubernetes", "jenkins", "mongodb", "bootstrap", "postgresql", "mysql", "sqlite", "memcached", "aws",
      "python", "linux", "ajax", "nginx", "react", "android", "ios", "angular", "tensorflow",
      "docker", "xcode", "java", "redis", "ruby", "sass", "rails", "html/css", "apache", "php", "github",
      "webpack", "node.js", "babel", "adobe xd", "adobe illustrator", "adobe photoshop", "microsoft word",
      "microsoft excel", "microsoft powerpoint", "balsamiq"
    ];
    this.selectedConceptTags = [];
    this.selectedTechStackTags = [];
  }

  buildTags( divId, listType ) {
    let tagList = [];
    if ( listType === 'concept' ) {  tagList = this.conceptList; }
    else if ( listType === 'techStack' ) { tagList = this.techStackList; }
    function buildTag( tag ){
      return `<li class="searchBadge" data-type=${listType}><a href="#">${tag}</a></li>`;
    }
    let html = `<div id=${divId} class="blog-tags container-fluid"> <ul>`;

    tagList.forEach( (t) => {
      html += buildTag(t);
    })
    html += '</ul></div>';
    return html;
  }

  getSelected(){
    return {
      selectedConceptTags : this.selectedConceptTags,
      selectedTechStackTags : this.selectedTechStackTags
    }
  }

  removeTag( tag ) {
    let spliceIndex = 0;
    let foundCheck = this.selectedConceptTags.find( (t, i) => {
      if ( t === tag ) { spliceIndex = i; return t; }
    })
    if ( foundCheck ) {
      this.selectedConceptTags.splice( spliceIndex, 1 );
    } else {
      console.log("Something went wrong with tag removal");
    }
  }
  toggleHighlight( listItem ) {
    //css for selected-tag can be found in cards.css
    if ( listItem.hasClass('selected-tag') ) {
      listItem.removeClass('selected-tag');
    } else {
      listItem.addClass('selected-tag')
    }
  }

  addHandles( divId ) {
    let that = this,
        tags = $('#' + divId).find('ul li.searchBadge');
    tags.toArray().forEach( (tag) => {
      $(tag).on('click', (el) => {
        el.preventDefault();
        let tagText = $(el.target).text(),
            parent = $(el.target).parent(),
            type = $(parent).attr('data-type');
        that.toggleHighlight(parent);
        if ( type === 'concept') {
          if ( that.selectedConceptTags.includes(tag) ) {
              that.removeTag(tag);
          } else {
            that.selectedConceptTags.push(tag)
          }
        }
        else if ( type === 'techStack') {
          if ( this.selectedTechStackTags.includes(tag) ) {
            that.removeTag(tag);
          } else {
            that.selectedTechStackTags.push(tag)
          }
        }
      })
    })
  }
}
