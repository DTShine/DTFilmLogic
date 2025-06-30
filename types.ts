export enum UserRole {
    Admin = 'Admin',
    Manager = 'Manager',
    Technician = 'Technician',
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export enum ServiceType {
    PPF = 'PPF',
    WindowTint = 'Window Tint',
    WindshieldProtection = 'Windshield Protection',
    CeramicCoating = 'Ceramic Coating',
    Detailing = 'Detailing',
    Other = 'Other',
}

export interface Service {
    id: string;
    type: ServiceType;
    area: string;
    price: number;
    materialId?: string; // ID of the inventory item used
    materialSqFt?: number; // SqFt of material used/estimated
    materialCost?: number; // Calculated cost of material for this service
}

export interface PhotoAnnotation {
  url: string; // base64 or external URL
  notes: string;
}

export enum JobStatus {
    Quote = 'Quote',
    Scheduled = 'Scheduled',
    InProgress = 'In Progress',
    QCNeeded = 'QC Needed',
    Completed = 'Completed',
    Cancelled = 'Cancelled',
}

export interface Vehicle {
    vin: string;
    make: string;
    model: string;
    subModel: string;
    year: number;
    photoUrl?: string; // URL or base64 string
}

export interface Job {
    id: string;
    invoiceId: string;
    vehicle: Vehicle;
    services: Service[];
    assignedTechnicianIds: string[];
    status: JobStatus;
    appointmentDate: string; // ISO string
    notes?: string;
    totalPrice: number;
    paymentStatus: 'Paid' | 'Unpaid' | 'Partial';
    preInspectionPhotos: PhotoAnnotation[];
    qcPhotos: PhotoAnnotation[];
}

export enum InventoryType {
    PPFRoll = 'PPF Roll',
    TintRoll = 'Window Tint Roll',
    WindshieldRoll = 'Windshield Protection Roll',
    Supply = 'Supply',
    Tool = 'Tool',
}

export interface InventoryItem {
    id: string;
    name: string;
    type: InventoryType;
    supplier?: string;
    purchasePrice: number;
    quantity: number; // Current stock level
    unit?: string; // e.g., 'bottle', 'roll', 'each'
    lowStockThreshold: number;
    // For rolls
    rollId?: string;
    width?: number; // inches
    length?: number; // feet
    totalSqFt?: number;
    costPerSqFt?: number;
    remainingSqFt?: number; // Real-time tracking of used material
    // New fields
    tintPercentage?: number; // For TintRoll type
    leadTimeDays?: number; // For AI reordering
    isSmartShelfEnabled?: boolean;
    imageUrl?: string;
}

export enum ExpenseCategory {
    Rent = 'Rent',
    Utilities = 'Utilities',
    Payroll = 'Payroll',
    Supplies = 'Supplies',
    Marketing = 'Marketing',
    Other = 'Other',
}

export interface Expense {
    id: string;
    category: ExpenseCategory;
    description: string;
    amount: number;
    date: string; // ISO string
    vendor?: string;
}

export enum TimeLogType {
    Job = 'Job',
    GeneralShop = 'General Shop',
}

export interface TimeLog {
    id: string;
    technicianId: string;
    type: TimeLogType;
    jobId?: string; // if type is 'Job'
    clockIn: string; // ISO string
    clockOut?: string; // ISO string
    durationMinutes?: number;
    notes?: string;
}

export interface Settings {
    theme: 'light' | 'dark';
    accentColor: string;
    salesTaxRate: number;
    laborRatePerHour: number;
    defaultPricing: {
        ppf: { low: number; high: number; };
        tint: { low: number; high: number; };
        windshield: { low: number; high: number; };
        ceramicCoating: { low: number; high: number; };
    };
}