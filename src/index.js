import axios from 'axios';
import { TagMaster } from './tagMaster.js'
export class Index {

  constructor() {
    this.tagMaster = new TagMaster();
    this.initView();
  }
  initView() {
    let that = this;
    let conceptTagHtml = that.tagMaster.buildTags('conceptTags', 'concept'),
        techStackTagHtml = that.tagMaster.buildTags('techStackTags', 'techStack');
    $('#conceptTagContainer').append(conceptTagHtml);
    $('#techStackTagContainer').append(techStackTagHtml);
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

  }
}
