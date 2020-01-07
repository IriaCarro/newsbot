'use strict';

function getUtcDate(date) {
      try {
            return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
      } catch (e) {
            console.log(e);
            return null;
      }
}

module.exports = getUtcDate;