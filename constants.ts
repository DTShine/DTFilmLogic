
import { ServiceType, UserRole } from './types';

export const APP_NAME = "DoubleTake FilmLogic";

export const navItems = [
    { name: 'Dashboard', href: '#/', icon: 'fa-solid fa-tachometer-alt', roles: [UserRole.Admin, UserRole.Manager] },
    { name: 'The Shop', href: '#/shop', icon: 'fa-solid fa-user-cog', roles: [UserRole.Admin, UserRole.Manager] },
    { name: 'Jobs', href: '#/jobs', icon: 'fa-solid fa-car', roles: [UserRole.Admin, UserRole.Manager] },
    { name: 'Inventory', href: '#/inventory', icon: 'fa-solid fa-boxes-stacked', roles: [UserRole.Admin, UserRole.Manager] },
    { name: 'Financials', href: '#/financials', icon: 'fa-solid fa-chart-pie', roles: [UserRole.Admin] },
    { name: 'Expenses', href: '#/expenses', icon: 'fa-solid fa-receipt', roles: [UserRole.Admin, UserRole.Manager] },
    { name: 'Time Clock', href: '#/time-clock', icon: 'fa-solid fa-clock', roles: [UserRole.Admin, UserRole.Manager] },
    { name: 'User Management', href: '#/users', icon: 'fa-solid fa-users', roles: [UserRole.Admin] },
    { name: 'AI Oracle', href: '#/ai-oracle', icon: 'fa-solid fa-wand-magic-sparkles', roles: [UserRole.Admin, UserRole.Manager] },
    { name: 'Settings', href: '#/settings', icon: 'fa-solid fa-cog', roles: [UserRole.Admin, UserRole.Manager] },
];

export const serviceCoverageOptions: Record<ServiceType, string[]> = {
    [ServiceType.PPF]: ['Full Frontal', 'Full Frontal Plus', 'Full Body', 'Front Bumper', 'Fenders', 'Hood', 'A-Pillars', 'Doors', 'Roof', 'Rear Quarters', 'Rear Bumper', 'Lift Gate', 'Spoiler', 'Rockers', 'Headlights', 'B-Pillars', 'Misc. Panels'],
    [ServiceType.WindowTint]: ['Two Front Windows', 'Two Back Windows', 'All Windows and Rear', 'Sun Roof', 'Windshield'],
    [ServiceType.WindshieldProtection]: ['Windshield'],
    [ServiceType.CeramicCoating]: ['Full Vehicle', 'Rims', 'Windows', 'Plastic Trim', 'Interior'],
    [ServiceType.Detailing]: [],
    [ServiceType.Other]: [],
};
