// Initialisation du module moment et de la timezone FR
const moment = require('moment-timezone');
const frLocal = require('moment/locale/fr')

module.exports = {
    // Fonction pour mettre la date dans le format EU/FR
    formatDate: function(datetime, format) {
        if (moment) {
            moment.updateLocale('fr', frLocal);
           var time1 = moment(datetime).tz("Europe/Paris").format(format)
           return time1
        }
        else {
          return datetime;
        }
      },

    // Fonction donnant le temps passé entre les post et maintenant
    formatDateCom: function(datetime, format) {
        if (moment) {
            moment.updateLocale('fr', frLocal);
           var time2 = moment(datetime).fromNow()
           return time2
        }
        else {
          return datetime;
        }
      },

      // Fonction permettant de faire une condition dans handlebars
      ifCond: function(a, b, opts) {
        if (a === b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    }
}