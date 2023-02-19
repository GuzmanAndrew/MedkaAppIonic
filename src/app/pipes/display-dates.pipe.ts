import { Pipe, PipeTransform } from '@angular/core';

import { CommonDataItem, CommonDataRow, TrackingType } from '../models';
import { serializeRows } from '../models/functions';

@Pipe({
  name: 'displayDates'
})
export class DisplayDatesPipe implements PipeTransform {

  transform(items: CommonDataRow[], asType: TrackingType): CommonDataItem[] {
    return serializeRows(items, asType);
  }

}
