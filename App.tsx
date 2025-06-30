import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { useApp } from './hooks/useAppContext';
import { Layout } from './components/Layout';
import { 
    LoginPage, 
    DashboardPage, 
    JobManagementPage, 
    JobDetailPage, 
    NewJobPage, 
    InventoryPage, 
    FinancialsPage, 
    ExpensesPage, 
    TimeClockPage, 
    UserManagementPage, 
    AiOraclePage, 
    SettingsPage, 
    TheShopPage 
} from './pages';
import { UserRole } from './types';
import { LoadingSpinner } from './components/ui';

const ProtectedRoute: React.FC<{ children: React.ReactNode, roles?: UserRole[] }> = ({ children, roles }) => {
    const { currentUser } = useApp();
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    if (roles && !roles.includes(currentUser.role)) {
        // Redirect based on role if unauthorized
        return <Navigate to={currentUser.role === UserRole.Technician ? "/shop" : "/"} replace />;
    }
    return <>{children}</>;
};


const AppRoutes: React.FC = () => {
    const { currentUser } = useApp();

    if (!currentUser) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }
    
    // Technicians get a dedicated, full-screen interface
    if (currentUser.role === UserRole.Technician) {
        return (
            <Routes>
                <Route path="/shop" element={<TheShopPage />} />
                <Route path="*" element={<Navigate to="/shop" />} />
            </Routes>
        );
    }
    
    // Admins and Managers get the standard layout
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/shop" element={<ProtectedRoute roles={[UserRole.Admin, UserRole.Manager]}><TheShopPage isEmbedded={true} /></ProtectedRoute>} />
                <Route path="/jobs" element={<ProtectedRoute roles={[UserRole.Admin, UserRole.Manager]}><JobManagementPage /></ProtectedRoute>} />
                <Route path="/jobs/new" element={<ProtectedRoute roles={[UserRole.Admin, UserRole.Manager]}><NewJobPage /></ProtectedRoute>} />
                <Route path="/jobs/:id" element={<ProtectedRoute roles={[UserRole.Admin, UserRole.Manager]}><JobDetailPage /></ProtectedRoute>} />
                <Route path="/inventory" element={<ProtectedRoute roles={[UserRole.Admin, UserRole.Manager]}><InventoryPage /></ProtectedRoute>} />
                <Route path="/financials" element={<ProtectedRoute roles={[UserRole.Admin]}><FinancialsPage /></ProtectedRoute>} />
                <Route path="/expenses" element={<ProtectedRoute roles={[UserRole.Admin, UserRole.Manager]}><ExpensesPage /></ProtectedRoute>} />
                <Route path="/time-clock" element={<ProtectedRoute roles={[UserRole.Admin, UserRole.Manager]}><TimeClockPage /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute roles={[UserRole.Admin]}><UserManagementPage /></ProtectedRoute>} />
                <Route path="/ai-oracle" element={<ProtectedRoute roles={[UserRole.Admin, UserRole.Manager]}><AiOraclePage /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute roles={[UserRole.Admin, UserRole.Manager]}><SettingsPage /></ProtectedRoute>} />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Layout>
    );
};

const AppInitializer: React.FC = () => {
    const { initialAuthCheck } = useApp();

    if (!initialAuthCheck) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return <AppRoutes />;
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <HashRouter>
                <AppInitializer />
            </HashRouter>
        </AppProvider>
    );
};

export default App;