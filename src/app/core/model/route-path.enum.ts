export const RoutePath = {
    MASTER: {
        ROOT: 'master',
        _MERCHANT: 'doi-tac',
        get MERCHANT() {
            return this.ROOT + '/' + this._MERCHANT;
        },

        _COUNTRY: 'quoc-gia',
        get COUNTRY() {
            return this.ROOT + '/' + this._COUNTRY;
        },

        _PROVINCE: 'tinh-thanh',
        get PROVINCE() {
            return this.ROOT + '/' + this._PROVINCE;
        },

        _DISTRICT: 'quan-huyen',
        get DISTRICT() {
            return this.ROOT + '/' + this._DISTRICT;
        },
    },
    SETTING: {
        ROOT: 'cau-hinh',
        _USER: 'tai-khoan',
        get USER() {
            return this.ROOT + '/' + this._USER;
        },

        _STOCK: 'kho',
        get STOCK() {
            return this.ROOT + '/' + this._STOCK;
        },

        _UNIT: 'don-vi-tinh',
        get UNIT() {
            return this.ROOT + '/' + this._UNIT;
        },

        _COLOR: 'mau-sac',
        get COLOR() {
            return this.ROOT + '/' + this._COLOR;
        },

        _PRODUCT: 'san-pham',
        get PRODUCT() {
            return this.ROOT + '/' + this._PRODUCT;
        },

        _PRICE_LIST: 'bang-gia',
        get PRICE_LIST() {
            return this.ROOT + '/' + this._PRICE_LIST;
        },

        _PRICE_CREATE: 'tao-bang-gia',
        get PRICE_CREATE() {
            return this.ROOT + '/' + this._PRICE_CREATE;
        },

        _KPI_LIST: 'kpi',
        get KPI_LIST() {
            return this.ROOT + '/' + this._KPI_LIST;
        },

        _KPI_CREATE: 'tao-kpi',
        get KPI_CREATE() {
            return this.ROOT + '/' + this._KPI_CREATE;
        },
    },
    BILL: {
        ROOT: 'don-hang',
        _CUSTOMER: 'khach-hang',
        get CUSTOMER() {
            return this.ROOT + '/' + this._CUSTOMER;
        },

        _ORDER_LIST: 'danh-sach',
        get ORDER_LIST() {
            return this.ROOT + '/' + this._ORDER_LIST;
        },

        _ORDER_CREATE: 'tao-don',
        get ORDER_CREATE() {
            return this.ROOT + '/' + this._ORDER_CREATE;
        },

        _ORDER_DETAIL: 'chi-tiet',
        get ORDER_DETAIL() {
            return this.ROOT + '/' + this._ORDER_DETAIL;
        },
    },
    WAREHOUSE: {
        ROOT: 'kho',

        _INVENTORY: 'ton-kho',
        get INVENTORY() {
            return this.ROOT + '/' + this._INVENTORY;
        },

        _RECEIPT_NOTE: 'phieu-nhap',
        get RECEIPT_NOTE() {
            return this.ROOT + '/' + this._RECEIPT_NOTE;
        },

        _DELIVERY_NOTE: 'phieu-xuat',
        get DELIVERY_NOTE() {
            return this.ROOT + '/' + this._DELIVERY_NOTE;
        },

        _TRANSFER_NOTE: 'phieu-dieu-chuyen',
        get TRANSFER_NOTE() {
            return this.ROOT + '/' + this._TRANSFER_NOTE;
        },

        _STOCK_IN: 'nhap-kho',
        get STOCK_IN() {
            return this.ROOT + '/' + this._STOCK_IN;
        },

        _TRANSFER: 'dieu-chuyen',
        get TRANSFER() {
            return this.ROOT + '/' + this._TRANSFER;
        },

        _TRANSFER_DETAIL: 'chi-tiet-dieu-chuyen',
        get TRANSFER_DETAIL() {
            return this.ROOT + '/' + this._TRANSFER_DETAIL;
        },
    },
    REPORT: {
        ROOT: 'bao-cao',

        _REVENUE: 'kpi-sale',
        get REVENUE() {
            return this.ROOT + '/' + this._REVENUE;
        },

        _PROFIT: 'ban-hang',
        get PROFIT() {
            return this.ROOT + '/' + this._PROFIT;
        },

        _REVENUE_CHART: 'doanh-thu',
        get REVENUE_CHART() {
            return this.ROOT + '/' + this._REVENUE_CHART;
        },

        _TOP_CUSTOMER: 'top-khach-hang',
        get TOP_CUSTOMER() {
            return this.ROOT + '/' + this._TOP_CUSTOMER;
        },
    }
}
