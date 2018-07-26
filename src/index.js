import axios from 'axios';
import { TagMaster } from './tagMaster.js'
export class Index {

  constructor() {
    this.tagMaster = new TagMaster();
    console.log(this.tagMaster);
    this.initView();
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
  handles() {
    //If a tag is clicked and it does not exist in the filterTags area then I recreate it there
    let that = this;
    this.tagMaster.getAllTags().forEach( (tag) => {
      $(tag).on('click', (el) => {
        console.log( tag, that.tagMaster.getSelected() )

      })
    })
  }
}
