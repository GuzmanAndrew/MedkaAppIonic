import { Pipe, PipeTransform } from '@angular/core';

import { CommonDataItem, CommonDataGroup } from '../models';
import { groupByDay } from '../models/functions';

@Pipe({
  name: 'groupDates'
})
export class GroupDatesPipe implements PipeTransform {

  transform(items: CommonDataItem[]): CommonDataGroup[] {
    return groupByDay(items);
  }

}
