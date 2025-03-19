import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import {Empty} from './app/pages/empty/empty';
import {AuthGuard} from './app/core/guard/auth.guard';
import {HomeComponent} from "./app/pages/home/home.component";

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: HomeComponent },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ],
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
