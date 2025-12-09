import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  BarChart3,
  Settings,
  Stethoscope,
  Home,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks";

export function NavigationMenu() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { profile, logout } = useAuth();

  const menuItems = [
    {
      path: "/app/home",
      label: "Inicio",
      icon: Home,
      description: "Panel principal",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      available: true,
    },
    {
      path: "/app/analysis",
      label: "Análisis IA",
      icon: Brain,
      description: "Analizar imágenes cerebrales",
      color: "text-primary",
      bgColor: "bg-primary/10",
      available: true,
    },
    {
      path: "/app/medical-dashboard",
      label: "Dashboard Médico",
      icon: BarChart3,
      description: "Estadísticas y pacientes",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      available: true,
    },
    {
      path: "/app/admin",
      label: "Administración",
      icon: Settings,
      description: "Gestión del sistema",
      color: "text-red-600",
      bgColor: "bg-red-50",
      available: profile.role === "admin",
    },
  ];

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={handleMobileMenuClose}
        />
      )}

      <nav
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-16" : "w-64"}`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-br from-primary to-blue-500 rounded-lg">
                  <Brain className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-base md:text-lg font-bold text-gray-900">
                    NeuroAnalyzer
                  </h1>
                  <p className="text-xs text-gray-600 hidden sm:block">
                    Análisis de Alzheimer
                  </p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0 hidden lg:flex hover:bg-gray-100"
            >
              {isCollapsed ? (
                <Menu className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMobileMenuClose}
              className="h-8 w-8 p-0 lg:hidden hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {!isCollapsed && (
            <Card className="mb-6 bg-linear-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Stethoscope className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Dr. {profile.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {profile.role === "admin" ? "Admin" : "Médico"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-1 mb-6">
            {menuItems
              .filter((item) => item.available)
              .map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleMobileMenuClose}
                    className={`
                                            w-full p-3 rounded-lg text-left transition-all duration-200 flex items-center
                                            ${
                                              isActive
                                                ? "bg-primary/15 border border-primary/30 shadow-sm"
                                                : "hover:bg-gray-100"
                                            }
                                            ${
                                              isCollapsed
                                                ? "justify-center"
                                                : "gap-3"
                                            }
                                        `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <div
                      className={`p-2 rounded-md ${
                        isActive ? "bg-primary/20" : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive ? "text-primary" : "text-gray-600"
                        }`}
                      />
                    </div>
                    {!isCollapsed && (
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${
                            isActive
                              ? "text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </Link>
                );
              })}
          </div>

          <div className="space-y-2">
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider px-2">
                Acciones
              </h3>
            )}

            <Link
              to="/app/analysis"
              onClick={handleMobileMenuClose}
              className={`flex items-center bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg text-sm font-medium text-primary transition-colors ${
                isCollapsed
                  ? "w-full p-2 h-10 justify-center"
                  : "w-full justify-start gap-3 px-3 py-2"
              }`}
              title={isCollapsed ? "Nuevo Análisis" : undefined}
            >
              <Brain className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>Nuevo Análisis</span>}
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className={`flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent border-red-200 hover:border-red-300 ${
                isCollapsed ? "w-full p-2 h-10 justify-center" : "w-full justify-start gap-3"
              }`}
              title={isCollapsed ? "Cerrar Sesión" : undefined}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!isCollapsed && "Cerrar Sesión"}
            </Button>
          </div>
        </div>
      </nav>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden h-10 w-10 p-0"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}
