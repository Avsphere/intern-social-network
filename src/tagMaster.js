export class TagMaster {
  constructor(moveTo) {
    this.conceptList = [
      'gaming',
      'mixed reality',
      'virtual reality',
      'augmented reality',
      'accessibility',
      'supportability',
      'artificial intelligence',
      'machine learning',
      'iot',
      'big data',
      'security',
      'natural language processing',
      'speech recognition',
      'ux',
      'ui',
      'merchandising',
      'design',
      'data storage',
      'blockchain',
      'education',
      'automation',
      'networking',
      'anomaly detection',
      'distributed systems',
      'event sourcing',
      'cloud',
      'image recognition'
    ]
    this.techStackList = [
      'unity',
      'javascript',
      'jquery',
      'django',
      'go',
      'objective c',
      'backbone.js',
      'powershell',
      'c#',
      'asp.net',
      'kubernetes',
      'jenkins',
      'mongodb',
      'bootstrap',
      'postgresql',
      'mysql',
      'sqlite',
      'memcached',
      'aws',
      'python',
      'linux',
      'ajax',
      'nginx',
      'react',
      'android',
      'ios',
      'angular',
      'tensorflow',
      'docker',
      'xcode',
      'java',
      'redis',
      'ruby',
      'sass',
      'rails',
      'html',
      'css',
      'apache',
      'php',
      'github',
      'webpack',
      'node.js',
      'babel',
      'adobe xd',
      'adobe illustrator',
      'adobe photoshop',
      'microsoft word',
      'microsoft excel',
      'microsoft powerpoint',
      'balsamiq',
    ]
    this.selectedConceptTags = []
    this.selectedTechStackTags = []
    this.populatedDivs = []
  }

  tagToDataValue(tag) {
    return tag; //for demo before making tag model
    // return tag
    //   .toLowerCase()
    //   .trim()
    //   .split(' ')
    //   .join('_')
  }
  // buildSingleTag(tag, dataVal, type) {
  //   return `<li class="searchBadge" data-type=${type} data-value=""${dataVal}><a href="#">${tag}</a></li>`
  // }

  buildTags(divId, listType) {
    let that = this
    //assumes it was appended
    this.populatedDivs.push(divId)
    let tagList = []
    if (listType === 'concept') {
      tagList = this.conceptList
    } else if (listType === 'techStack') {
      tagList = this.techStackList
    }
    function buildTag(tag) {
      //let value = that.tagToDataValue(tag)
      return `<li class="searchBadge" data-type="${listType}" data-value="${tag}"><a href="#">${tag}</a></li>`
    }
    let html = `<div id=${divId}><ul>`

    tagList.forEach(t => {
      html += buildTag(t)
    })
    html += '</ul></div>'
    //console.log("HTML\n\n", html);
    return html
  }

  getSelected() {
    return {
      selectedConceptTags: this.selectedConceptTags,
      selectedTechStackTags: this.selectedTechStackTags,
    }
  }

  getPopulatedDivs() {
    return this.populatedDivs
  }

  removeTag(tagDataVal, type) {
    let spliceIndex = 0,
      selectedTags =
        type === 'techStack'
          ? this.selectedTechStackTags
          : this.selectedConceptTags
    let foundCheck = selectedTags.find((t, i) => {
      if (t === tagDataVal) {
        spliceIndex = i
        return t
      }
    })
    if (foundCheck) {
      selectedTags.splice(spliceIndex, 1)
    } else {
      console.log('Something went wrong with tag removal')
    }
  }
  toggleHighlight(listItem) {
    //css for selected-tag can be found in cards.css
    if (listItem.is('li')) {
      if (listItem.hasClass('selected-tag')) {
        listItem.removeClass('selected-tag')
      } else {
        listItem.addClass('selected-tag')
      }
    } else {
      console.log('item clicked is ', listItem)
    }
  }

  getAllTags() {
    let allTags = []
    this.populatedDivs.forEach(divId => {
      let tags = $('#' + divId)
        .find('ul li.searchBadge')
        .toArray()
      allTags = allTags.concat(tags)
    })
    return allTags
  }

  getTagsIn(divId) {
    let tags = $('#' + divId)
      .find('ul li.searchBadge')
      .toArray()
    return tags
  }

  addHandles() {
    let that = this
    this.populatedDivs.forEach(divId => {
      let tags = $('#' + divId).find('ul li.searchBadge')
      tags.toArray().forEach(tag => {
        $(tag).on('click', el => {
          el.preventDefault()
          console.log(divId, tag)
          let $tag = $(el.target),
            liElem = $tag.closest('li'),
            type = $(liElem).attr('data-type'),
            tagDataVal = $(liElem).attr('data-value')
          that.toggleHighlight(liElem)
          if (type === 'concept') {
            if (that.selectedConceptTags.includes(tagDataVal)) {
              that.removeTag(tagDataVal, type)
            } else {
              that.selectedConceptTags.push(tagDataVal)
            }
          } else if (type === 'techStack') {
            if (this.selectedTechStackTags.includes(tagDataVal)) {
              that.removeTag(tagDataVal, type)
            } else {
              that.selectedTechStackTags.push(tagDataVal)
            }
          }
        })
      })
    })
  }
}
