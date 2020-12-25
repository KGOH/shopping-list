import { Injectable } from '@angular/core';
import {toNumber, map as _map, filter as _filter, isArray} from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  static regex = /^(?<dosageCount>\d+)(?: (?<dosageUnit>таблет(?:ка|ки|ок)|капсул[а|ы]?)(?: ((?<daily>каждый день)|каждые (?<intervalDays>(?:[1-9]\d+|[2-9]))(?<intervalDaysSuffix> дн(?:я|ей))?)(?: (до|после|во время|за \d+ минуты? до|через \d+ минуты? после)(?: (завтрака|полдника|обеда|ужина))?)?)?)?/;

  constructor() { }

  private static isFew(count: number): boolean {
    if (count >= 5 && count <= 20) { return false; }
    count %= 10;
    return count > 0 && count < 5;
  }

  private static generateDosageSuggestions(count: number|undefined): (string|[string, string])[] {
    if (count !== undefined && count <= 0) {
      count = undefined;
    }
    if (count === undefined) {
      return [['X таблеток', ''], ['X капсул', '']];
    } else if (count === 1) {
      return [' таблетка', ' капсула'];
    } else if (this.isFew(count)) {
      return [' таблетки', ' капсулы'];
    } else {
      return [' таблеток', ' капсул'];
    }
  }

  private static generateIntervalSuggestions(count: number|undefined): (string|[string, string])[] {
    if (count === undefined) {
      return [
        ' каждый день', ' каждые 2 дня', ' каждые 5 дней',
        [' каждые X дней', ' каждые ']
      ];
    } else if (this.isFew(count)) {
      return [' дня'];
    } else {
      return [' дней'];
    }
  }

  private static generateEventSuggestions(offset: number|undefined): (string|[string, string])[] {
    if (offset === undefined) {
      return [' до', ' после', 'во время', [' за X минут до', ' за'], [' через X минут после', ' через ']];
    }
    return [];
  }

  generateSuggestions(text: string): [string, string][] {
    const match = ScheduleService.regex.exec(text);
    const prefix = match && match[0] || '';
    const suggestions = _map(this.generateSuggestionsInternal(match),
        x => (isArray(x) ? [prefix + x[0], prefix + x[1]] as [string, string] : [prefix + x, prefix + x]) as [string, string]);
    const filteredSuggestions = _filter(suggestions, x => {
      return x[0].startsWith(text);
    });
    return filteredSuggestions.length > 0 ? filteredSuggestions : suggestions;
  }

  generateSuggestionsInternal(match: RegExpExecArray|null): (string|[string, string])[] {
    if (match == null || match.groups === undefined)
    {
      return ScheduleService.generateDosageSuggestions(undefined);
    }
    else if (match.groups.dosageUnit === undefined)
    {
      return ScheduleService.generateDosageSuggestions(toNumber(match.groups.dosageCount));
    }
    else if (match.groups.daily === undefined && match.groups.intervalDaysSuffix === undefined)
    {
      const count = match.groups.intervalDays !== undefined ? toNumber(match.groups.intervalDays) : undefined;
      return ScheduleService.generateIntervalSuggestions(count);
    }

    return [];
  }
}
