/**
 * Silicone API
 * Web API for Silicone
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { UnitDto } from './unit-dto';


export interface UnitDtoPaginatedList { 
    pageNumber?: number;
    pageSize?: number;
    readonly totalRecord?: number;
    readonly totalPaging?: number;
    readonly data?: Array<UnitDto> | null;
}

