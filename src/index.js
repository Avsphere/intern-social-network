import axios from 'axios';
import { TagMaster } from './tagMaster.js'
export class Index {

  constructor() {
    this.tagMaster = new TagMaster();
    console.log(this.tagMaster);
    this.initView();
    this.t = 0;
  }
  initView() {
    let conceptTagHtml = this.tagMaster.buildTags('conceptTags', 'concept'),
        techStackTagHtml = this.tagMaster.buildTags('techStackTags', 'techStack');
    $('#conceptTagContainer').append(conceptTagHtml);
    $('#techStackTagContainer').append(techStackTagHtml);
    //These are the mandatory handles that add selected tags to array
    this.tagMaster.addHandles();
    this.handles();
  }


  helloworld() {
    console.log("Hello world");
  }
  // e.preventDefault();
  // let conceptTagDivId = 'conceptTagDiv' + that.currProjectCount,
  //     techStackTagDivId = 'techStackDiv' + that.currProjectCount,
  //     newProjectHtml = that.buildProjectHtml();
  //
  // let conceptTagHtml = that.tagMaster.buildTags(conceptTagDivId, 'concept'),
  //     techStackTagHtml = that.tagMaster.buildTags(techStackTagDivId, 'techStack');
  // $('#projectSection').append(newProjectHtml);
  // $('#conceptTags' + that.currProjectCount).append(conceptTagHtml);
  // $('#techStackTags' + that.currProjectCount).append(techStackTagHtml)
  // that.tagMaster.addHandles(conceptTagDivId);
  // that.tagMaster.addHandles(techStackTagDivId);
  getCurrentFilterTags() {
    this.currentFilterTags = this.tagMaster.getTagsIn('filterTags');
    return this.currentFilterTags;
  }

  handles() {
    //If a tag is clicked and it does not exist in the filterTags area then I recreate it there
    let that = this;
    function handleFilterTagClick( el ) {
      el.preventDefault()
      let tag = $(el.target),
          tagDataVal = $(el.target).parent().attr('data-value')
      $(tag).remove()
      that.tagMaster.getAllTags().find( (t) => {
        if ( $(t).attr('data-value') === tagDataVal ) {
          console.log("FOund it")
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

      let foundTag = currentFilterTags.find( (t) => {
        if ( $(t).attr('data-value') === tagDataValue ) {
          return t;
        }
      })

      if ( foundTag ) {
        $(foundTag).remove();
        console.log("removed", tagDataValue)

      } else {
        console.log("current filter tags:", currentFilterTags)
        let filterTag = $( tag.outerHTML );
        filterTag.removeClass('selected-tag')
        $('#filterTags').find('ul').append( filterTag )
        $(filterTag).on('click', handleFilterTagClick);
      }
    }

    this.tagMaster.getAllTags().forEach( (tag) => {
      $(tag).on('click', (el) => {
        handleTagPlacement(tag);
      })
    })
  }
}
