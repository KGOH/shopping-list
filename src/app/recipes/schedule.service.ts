import {Injectable} from '@angular/core';
import {filter as _filter, isArray, map as _map, toNumber} from 'lodash-es';
import {ScheduleEvent, ScheduleEventType} from '../domain/Schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  static regex = /^(?<dosageCount>\d+)(?: (?<dosageUnit>доз[аы]?)(?: ((?<daily>каждый день)|каждые (?<intervalDays>(?:[1-9]\d+|[2-9]))(?<intervalDaysSuffix> дн(?:я|ей))?)(?: (?:(?<eventAt>до|после|во время)|за (?<eventBefore>(?:[1-9]\d+|[2-9]))(?<eventBeforeSuffix> минуты? до)?|через (?<eventAfter>(?:[1-9]\d+|[2-9]))(?<eventAfterSuffix> минуты? после)?)(?: (?<eventName>завтрака|полдника|обеда|ужина))?)?)?)?/;

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
      return ['1 доза', ['X доз', '']];
    } else if (count === 1) {
      return [' доза'];
    } else if (this.isFew(count)) {
      return [' дозы'];
    } else {
      return [' доз'];
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

  private static generateEventAtSuggestions(offset: number|undefined): (string|[string, string])[] {
    if (offset === undefined) {
      return [' до', ' после', ' во время', [' за X минут до', ' за '], [' через X минут после', ' через ']];
    } else if (offset < 0) {
      return this.isFew(-offset) ? [' минуты до '] : [' минут до'];
    } else if (offset > 0) {
      return this.isFew(offset) ? [' минуты после '] : [' минут после'];
    }
    return [];
  }

  private static generateEventSuggestions(): (string|[string, string])[] {
    return [' завтрака', ' полдника', ' обеда', ' ужина'];
  }

  private static parseTimeOffset(eventAt: string|undefined, eventBefore: string|undefined, eventAfter: string|undefined): number {
    if (eventBefore !== undefined) {
      return -toNumber(eventBefore);
    }
    if (eventAfter !== undefined) {
      return toNumber(eventAfter);
    }
    switch (eventAt) {
      case 'до':
        return -1;
      case 'после':
        return 1;
      case 'во время':
      default:
        return 0;
    }
  }

  private static parseEventType(eventName: string): ScheduleEventType {
    switch (eventName) {
      case 'завтрака':
      default:
        return ScheduleEventType.Breakfast;
      case 'полдника':
        return ScheduleEventType.Lunch;
      case 'обеда':
        return ScheduleEventType.Dinner;
      case 'ужина':
        return ScheduleEventType.Supper;
    }
  }


  private static parseRepeatInterval(intervalDays: string|undefined): number {
    return intervalDays !== undefined ? toNumber(intervalDays) : 1;
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
    const groups = match && match.groups || undefined;
    if (groups === undefined)
    {
      return ScheduleService.generateDosageSuggestions(undefined);
    }
    else if (groups.dosageUnit === undefined)
    {
      return ScheduleService.generateDosageSuggestions(toNumber(groups.dosageCount));
    }
    else if (groups.daily === undefined && groups.intervalDaysSuffix === undefined)
    {
      const count = groups.intervalDays !== undefined ? toNumber(groups.intervalDays) : undefined;
      return ScheduleService.generateIntervalSuggestions(count);
    }
    else if (groups.eventAt === undefined && groups.eventBeforeSuffix === undefined && groups.eventAfterSuffix === undefined)
    {
      const count = groups.eventBefore !== undefined ? -toNumber(groups.eventBefore) :
        (groups.eventAfter !== undefined ? toNumber(groups.eventAfter) : undefined);
      return ScheduleService.generateEventAtSuggestions(count);
    }
    else if (groups.eventName === undefined)
    {
      return ScheduleService.generateEventSuggestions();
    }

    return [];
  }

  createScheduleEvent(spec: string): ScheduleEvent {
    const match = ScheduleService.regex.exec(spec);
    const groups = match && match.groups || {};
    return {
      dosage: toNumber(groups.dosageCount),
      repeatInterval: ScheduleService.parseRepeatInterval(groups.intervalDays),
      timeOffset: ScheduleService.parseTimeOffset(groups.eventAt, groups.eventBefore, groups.eventAfter),
      type: ScheduleService.parseEventType(groups.eventName)
    } as ScheduleEvent;
  }
}
