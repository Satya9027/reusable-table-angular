import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform, Inject, LOCALE_ID } from "@angular/core";
import {TimeZoneService} from '../services/time-zone.service';


@Pipe({
  name: 'date',
  pure: true,
  standalone: true
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
  private defaultTimeZoneOffset: string;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private timeZoneService: TimeZoneService
  ) {
    super(locale);
    this.defaultTimeZoneOffset = this.timeZoneService.toNgOffset(
      this.timeZoneService.getSystemTimeZone()
    );
  }

  override transform(value: null | undefined, format?: string, timezone?: string, locale?: string): null;
  override transform(value: string | number | Date, format?: string, timezone?: string, locale?: string): string | null;
  override transform(value: string | number | Date | null | undefined, format?: string, timezone?: string, locale?: string): string | null {
    if (value == null) {
      return null;
    }
    const offset = timezone || this.defaultTimeZoneOffset;
    return super.transform(value, format, offset, locale);
  }
}
