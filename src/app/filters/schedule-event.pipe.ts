import { Pipe, PipeTransform } from '@angular/core';
import {ScheduleEvent, ScheduleEventType} from '../domain/Schedule';
import {ScheduleService} from '../recipes/schedule.service';

@Pipe({
  name: 'scheduleEvent',
  pure: true
})
export class ScheduleEventPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value);
    if (!(value instanceof ScheduleEvent)) { return '<wrong value>'; }
    let result = `${value.dosage} ${ScheduleService.formatPlural('доз', value.dosage, 'а', 'ы', '')} ${value.repeatInterval === 1 ? 'каждый день' : `каждые ${value.repeatInterval} ${ScheduleService.formatPlural('дн', value.dosage, '', 'я', 'ей')}`}`;
    if (value.timeOffset === 0) {
      result += ' во время';
    } else if (value.timeOffset > 1) {
      result += ` через ${value.timeOffset} ${ScheduleService.formatPlural('минут', value.dosage, 'у', 'ы', '')} после`;
    } else if (value.timeOffset > 0) {
      result += ' после';
    } else {
      result += ` за ${-value.timeOffset} ${ScheduleService.formatPlural('минут', value.dosage, 'у', 'ы', '')} до`;
    }
    switch (value.type) {
      case ScheduleEventType.Breakfast:
        result += ' завтрака';
        break;
      case ScheduleEventType.Lunch:
        result += ' полдника';
        break;
      case ScheduleEventType.Dinner:
        result += ' обеда';
        break;
      case ScheduleEventType.Supper:
        result += ' ужина';
        break;
    }
    return result;
  }

}
