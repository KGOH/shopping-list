import { Injectable } from '@angular/core';
import {toNumber, map as _map, filter as _filter, isArray} from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  static regex = /^(?<dosageCount>\d+)(?: (?<dosageUnit>таблет(?:ка|ки|ок)|капсул[а|ы]?)(?: ((?<daily>каждый день)|каждые (?<intervalDays>(?:[2-9]|[1-9]\d+))(?<intervalDaysSuffix> дн(?:я|ей))?)(?: (до|после|за \d+ минуты? до|через \d+ минуты? после)(?: (завтрака|полдника|обеда|ужина))?)?)?)?/;

  constructor() { }

  private static generateDosageSuggestions(count: number|undefined): (string|[string, string])[] {
    if (count !== undefined && count <= 0) {
      count = undefined;
    }
    if (count === undefined) {
      return [['X таблеток', '']];
    } else if (count === 1) {
      return ['1 таблетка', '1 капсула'];
    } else if (count < 5) {
      return [count + ' таблетки', count + ' капсулы'];
    } else {
      return [count + ' таблеток', count + ' капсул'];
    }
  }

  private static generateIntervalSuggestions(prefix: string, count: number|undefined): (string|[string, string])[] {
    if (count === undefined) {
      return [
        prefix + ' каждый день', prefix + ' каждые 2 дня', prefix + ' каждые 5 дней',
        [prefix + ' каждые X дней', prefix + ' каждые ']
      ];
    } else if (count < 5) {
      return [prefix + ' дня'];
    } else {
      return [prefix + ' дней'];
    }
  }

  generateSuggestions(text: string): [string, string][] {
    console.log(text);
    const suggestions = _map(this.generateSuggestionsInternal(text),
        x => (isArray(x) ? x as [string, string] : [x, x]) as [string, string]);
    const filteredSuggestions = _filter(suggestions, x => {
      console.log('filter', x, x[0], text, x[0].startsWith(text));
      return x[0].startsWith(text);
    });
    console.log(suggestions, filteredSuggestions);
    return filteredSuggestions.length > 0 ? filteredSuggestions : suggestions;
  }

  generateSuggestionsInternal(text: string): (string|[string, string])[] {
    const match = ScheduleService.regex.exec(text);
    console.log(match);
    if (match == null || match.groups === undefined)
    {
      return ScheduleService.generateDosageSuggestions(1);
    }
    else if (match.groups.dosageUnit === undefined)
    {
      return ScheduleService.generateDosageSuggestions(toNumber(match.groups.dosageCount));
    }
    else if (match.groups.daily === undefined && match.groups.intervalDaysSuffix === undefined)
    {
      const count = match.groups.intervalDays !== undefined ? toNumber(match.groups.intervalDays) : undefined;
      return ScheduleService.generateIntervalSuggestions(match[0], count);
    }

    return ScheduleService.generateDosageSuggestions(1);
  }
}
