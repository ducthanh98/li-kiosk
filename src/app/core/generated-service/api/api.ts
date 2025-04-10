export * from './cms-account.service';
import { CmsAccountService } from './cms-account.service';
export * from './cms-auth.service';
import { CmsAuthService } from './cms-auth.service';
export * from './cms-custom-field.service';
import { CmsCustomFieldService } from './cms-custom-field.service';
export * from './cms-customer.service';
import { CmsCustomerService } from './cms-customer.service';
export * from './cms-order.service';
import { CmsOrderService } from './cms-order.service';
export * from './cms-product.service';
import { CmsProductService } from './cms-product.service';
export * from './cms-report.service';
import { CmsReportService } from './cms-report.service';
export * from './cms-settings.service';
import { CmsSettingsService } from './cms-settings.service';
export * from './cms-warehouse.service';
import { CmsWarehouseService } from './cms-warehouse.service';
export * from './master-data.service';
import { MasterDataService } from './master-data.service';
export const APIS = [CmsAccountService, CmsAuthService, CmsCustomFieldService, CmsCustomerService, CmsOrderService, CmsProductService, CmsReportService, CmsSettingsService, CmsWarehouseService, MasterDataService];
