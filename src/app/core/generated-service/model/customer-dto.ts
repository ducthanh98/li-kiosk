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
import { DistrictDto } from './district-dto';
import { ContactBookDto } from './contact-book-dto';
import { ProvinceDto } from './province-dto';
import { CustomerType } from './customer-type';
import { AddressBookDto } from './address-book-dto';
import { OrderHistory } from './order-history';


export interface CustomerDto { 
    id?: string;
    createdDate?: string;
    phoneNumber: string;
    email?: string | null;
    fullName: string;
    address?: string | null;
    avatar?: string | null;
    dob?: string | null;
    note?: string | null;
    facebookId?: string | null;
    googleId?: string | null;
    appleId?: string | null;
    source?: string | null;
    merchantId: string;
    districtCode?: string | null;
    district?: DistrictDto;
    provinceCode?: string | null;
    province?: ProvinceDto;
    customerType?: CustomerType;
    customerCareer?: string | null;
    dateAssignment?: string;
    saleUserName?: string | null;
    orderLastest?: number | null;
    orderTotal?: number;
    orderCancel?: number;
    totalAmout?: number;
    addresses?: Array<AddressBookDto> | null;
    contacts?: Array<ContactBookDto> | null;
    orderHistories?: Array<OrderHistory> | null;
}
export namespace CustomerDto {
}


