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

  addHandles( divId ) {
    let that = this,
        tags = $('#' + divId).find('ul li.searchBadge');
    tags.toArray().forEach( (tag) => {
      $(tag).on('click', (el) => {
        el.preventDefault();
        let tag = $(el.target).text(),
            parent = $(el.target).parent(),
            type = $(parent).attr('data-type');
        if ( type === 'concept') {
          if ( this.selectedConceptTags.includes(tag) ) {
            console.log("already selected")
          } else {
            this.selectedConceptTags.push(tag)
          }
        }
        else if ( type === 'techStack') {
          if ( this.selectedTechStackTags.includes(tag) ) {
            console.log("already selected")
          } else {
            this.selectedTechStackTags.push(tag)
          }
        }
        console.log("Clicked tag!", this)
      })
    })
  }



}
