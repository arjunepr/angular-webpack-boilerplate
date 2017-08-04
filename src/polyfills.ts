import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

import {enableProdMode} from '@angular/core';

if(process.env.NODE_ENV === 'production'){
  enableProdMode();
} else {
  // Development and test settings
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}