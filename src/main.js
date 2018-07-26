import $ from 'jquery';
import 'bootstrap'
import blogViewControl from './blogViewControl.js'
import { Index } from './index.js'
import { RequestRunner } from './requestRunner.js'
import { Account } from './account.js'
$(function() {
  if ( window.location.pathname.includes('account') ) {
    let acc = new Account();
  } else if ( window.location.pathname.includes('/') ) {
    let ind = new Index();
  } else {
  }
})
