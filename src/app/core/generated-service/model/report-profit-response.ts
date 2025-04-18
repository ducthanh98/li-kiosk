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
import { ReportProfitDetail } from './report-profit-detail';


export interface ReportProfitResponse { 
    saleUserName?: string | null;
    totalOrderPrice?: number;
    totalShipCustomer?: number;
    totalShipSystem?: number;
    totalOrder?: number;
    totalOrderPromotion?: number;
    readonly revenue?: number;
    details?: Array<ReportProfitDetail> | null;
    totalOrderOrigin?: number;
    readonly profit?: number;
}

