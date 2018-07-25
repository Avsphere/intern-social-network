export class TagMaster {

  constructor() {
    this.conceptList = ['IoT', 'Cloud', 'AI', 'Outlook'];
    this.techStackList = ['ps', 'js', 'haskell', 'css'];
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

  addHandles( divId ) {
    let that = this,
        tags = $('#' + divId).find('ul li.searchBadge');
    tags.toArray().forEach( (tag) => {
      $(tag).on('click', (el) => {
        el.preventDefault();
        let tag = $(el.target).text(),
            parent = $(el.target).parent(),
            type = $(parent).attr('data-type');
        console.log("Tag was clicked!", el, type, that)
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
