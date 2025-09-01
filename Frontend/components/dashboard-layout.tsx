"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  Building,
  FileText,
  CreditCard,
  Wrench,
  BarChart3,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Menu,
  User,
  ChevronDown,
  Building2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { cn } from '@/lib/utils';

type User = {
  firstname: string;
  lastname?: string;
  email: string;
  role: "admin" | "owner" | "tenant";
  id?: string;
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function getRoleColor(role: User["role"]) {
  switch (role) {
    case "admin":
      return "bg-red-600 text-white";
    case "owner":
      return "bg-blue-600 text-white";
    case "tenant":
      return "bg-green-600 text-white";
    default:
      return "bg-gray-400 text-white";
  }
}

function getRoleLabel(role: User["role"]) {
  switch (role) {
    case "admin":
      return "Administrator";
    case "owner":
      return "Owner";
    case "tenant":
      return "Tenant";
    default:
      return "User";
  }
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const { role: routeRole, id: routeId } = params;

useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No token found");
      }

      const res = await fetch("http://localhost:5000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("accessToken");
        router.push("/login");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const userData: User = await res.json();

      // Optional: routeRole & routeId based checks
      if (routeRole && routeId) {
        if (
          userData.role !== routeRole ||
          userData.id?.toString() !== routeId?.toString()
        ) {
          localStorage.removeItem("accessToken");
          router.push("/login");
          return;
        }
      }

      setUser(userData);
    } catch (err) {
      console.error("Fetch user failed:", err);
      // Optional fallback if error isn't handled already
      localStorage.removeItem("accessToken");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, [router, routeRole, routeId]);


  useEffect(() => {
    setSidebarOpen(false); 
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

if (loading) {
  return (
    <div className="flex flex-col justify-center items-center h-64 space-y-4">
      <div className="w-7 h-7 rounded-full animate-spin bg-gradient-to-r from-emerald-600 to-blue-600 shadow-lg">
        <div className="w-full h-full bg-white rounded-full m-1"></div>
      </div>
      <p className="text-blue-600 text-sm font-medium animate-pulse">
        <span className="animate-bounce">...</span>
      </p>
    </div>
  );
}

if (!user) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 max-w-md w-full text-center space-y-6 border border-gray-200">
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-transparent border-t-[#28e3fc] rounded-full animate-spin"></div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
            🔒 Access Denied
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            You don’t have permission to view this page. If you believe this is an error, please contact support.
          </p>
        </div>

        {/* action button */}
        <div>
          <button
            className="mt-4 px-4 py-2 bg-[#28e3fc] text-white text-sm font-medium rounded hover:bg-[#22c2d8] transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

  const userId = user.id;
  const displayName = `${user.firstname} ${user.lastname ?? ""}`;

  const navigationItems = {
  admin: [
      { name: "Dashboard", href: `/dashboard/admin`, icon: Home },
      { name: "Users", href: `/dashboard/admin/users`, icon: Users },
      { name: "Register", href: `/dashboard/admin/register`, icon: User },
      { name: "Properties", href: `/dashboard/admin/properties`, icon: Building },
      { name: "Leases", href: `/dashboard/admin/leases`, icon: FileText },
      { name: "Payments", href: `/dashboard/admin/payments`, icon: CreditCard },
      { name: "Maintenance", href: `/dashboard/admin/maintenance`, icon: Wrench },
      { name: "Reports", href: `/dashboard/admin/reports`, icon: BarChart3 },
      { name: "Sales", href: `/dashboard/admin/sales`, icon: TrendingUp },
      { name: "Notifications", href: `/dashboard/admin/notifications`, icon: Bell },
      { name: "Settings", href: `/dashboard/admin/settings`, icon: Settings },
    ],

    owner: userId
      ? [
          { name: "Dashboard", href: `/dashboard/owner/${userId}`, icon: Home },
          { name: "Properties", href: `/dashboard/owner/${userId}/properties`, icon: Building },
          { name: "Leases", href: `/dashboard/owner/${userId}/leases`, icon: FileText },
          { name: "Payments", href: `/dashboard/owner/${userId}/payments`, icon: CreditCard },
          { name: "Reports", href: `/dashboard/owner/${userId}/reports`, icon: BarChart3 },
          { name: "Notifications", href: `/dashboard/owner/${userId}/notifications`, icon: Bell },
        ]
      : [],

    tenant: userId
      ? [
          { name: "Dashboard", href: `/dashboard/tenant`, icon: Home },
          { name: "My Properties", href: `/dashboard/tenant/my-properties`, icon: Building },
          { name: "Payments", href: `/dashboard/tenant/payments`, icon: CreditCard },
          { name: "Lease", href: `/dashboard/tenant/lease`, icon: FileText },
          { name: "Browse Properties", href: `/dashboard/tenant/properties`, icon: Home },
          { name: "Maintenance", href: `/dashboard/tenant/maintenance`, icon: Wrench },
          { name: "Notifications", href: `/dashboard/tenant/notifications`, icon: Bell },
        ]
      : [],
  };

  const navigation = navigationItems[user.role] || [];
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
			{/* Desktop Sidebar */}
			<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
				<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-[#9D9360] to-[#4A90E2] to-blue-700 px-6 pb-4 shadow-2xl border-r border-emerald-600/50">
					{/* Logo */}
					<div className="flex h-20 shrink-0 items-center">
						<div className="flex items-center space-x-4">
							<div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-blue-600 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg relative">
								<Building2 className="h-6 w-6 text-white" />
								<div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
									<span className="text-xs font-bold text-gray-800">A</span>
								</div>
							</div>
							<div>
								<span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
									Akeray PMS
								</span>
								<p className="text-xs text-emerald-100 font-medium">
									Property Management System
								</p>
							</div>
						</div>
					</div>

					{/* Navigation */}
					<nav className="flex flex-1 flex-col">
						<ul role="list" className="flex flex-1 flex-col gap-y-7">
							<li>
								<ul role="list" className="-mx-2 space-y-2">
									{navigation.map((item, index) => {
										const isActive = pathname === item.href;
										return (
											<li
												key={item.name}
												className="animate-in fade-in slide-in-from-left-4 duration-500"
												style={{
													animationDelay: `${index * 75}ms`,
													animationFillMode: "forwards",
												}}
											>
												<Link
													href={item.href}
													className={cn(
														"group flex gap-x-3 rounded-2xl p-4 text-sm font-semibold leading-6 transition-all duration-300",
														isActive
															? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-md transform scale-[1.02]"
															: "text-emerald-100 hover:text-white hover:bg-emerald-600/30 hover:scale-[1.01]"
													)}
												>
													<item.icon
														className={cn(
															"h-6 w-6 shrink-0 transition-colors",
															isActive
																? "text-white"
																: "text-emerald-200 group-hover:text-white"
														)}
													/>
													<span className="truncate">{item.name}</span>
												</Link>
											</li>
										);
									})}
								</ul>
							</li>
						</ul>
					</nav>

					{/* User Profile */}
					<div className="mt-auto">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="w-full justify-start p-4 h-auto hover:bg-emerald-600/30 rounded-2xl"
								>
									<div className="flex items-center space-x-3 w-full">
										<Avatar className="h-12 w-12 ring-2 ring-emerald-200/50">
											<AvatarImage src="/placeholder-user.jpg" />
											<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white font-bold">
												{displayName
													.split(" ")
													.slice(-2)
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div className="flex-1 text-left">
											<p className="text-sm font-semibold text-white truncate">
												{displayName}
											</p>
											<div className="flex items-center space-x-2">
												<Badge
													className={cn(
														"text-xs font-medium",
														getRoleColor(user.role)
													)}
												>
													{getRoleLabel(user.role)}
												</Badge>
											</div>
										</div>
										<ChevronDown className="h-4 w-4 text-emerald-200" />
									</div>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-64 bg-white/95 backdrop-blur-sm"
							>
								<DropdownMenuLabel className="text-center">
									<div className="font-semibold">{displayName}</div>
									<div className="text-xs text-gray-500 font-normal">
										{user.email || `${user.role}@akeray.et`}
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="cursor-pointer">
									<User className="mr-2 h-4 w-4" />
									Profile
								</DropdownMenuItem>
								<DropdownMenuItem className="cursor-pointer">
									<Settings className="mr-2 h-4 w-4" />
									Settings
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									className="text-red-600 cursor-pointer"
									onClick={handleLogout}
								>
									<LogOut className="mr-2 h-4 w-4" />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>

			{/* Mobile Sidebar */}
			<Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
				<SheetContent
					side="left"
					className="w-80 p-0 bg-gradient-to-b from-emerald-700 to-blue-700"
				>
					<div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
						{/* Logo */}
						<div className="flex h-20 shrink-0 items-center">
							<div className="flex items-center space-x-4">
								<div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-blue-600 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg relative">
									<Building2 className="h-6 w-6 text-white" />
									<div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
										<span className="text-xs font-bold text-gray-800">A</span>
									</div>
								</div>
								<div>
									<span className="font-bold text-xl text-emerald-100">
										Akeray PMS
									</span>
									<p className="text-xs text-emerald-100 font-medium">
										Property Management System
									</p>
								</div>
							</div>
						</div>

						{/* Navigation */}
						<nav className="flex flex-1 flex-col">
							<ul role="list" className="flex flex-1 flex-col gap-y-7">
								<li>
									<ul role="list" className="-mx-2 space-y-2">
										{navigation.map((item) => {
											const isActive = pathname === item.href;
											return (
												<li key={item.name}>
													<Link
														href={item.href}
														className={cn(
															"group flex gap-x-3 rounded-2xl p-4 text-sm font-semibold leading-6 transition-all duration-300",
															isActive
																? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-md"
																: "text-emerald-100 hover:text-white hover:bg-emerald-600/30"
														)}
														onClick={() => setSidebarOpen(false)}
													>
														<item.icon
															className={cn(
																"h-6 w-6 shrink-0 transition-colors",
																isActive
																	? "text-white"
																	: "text-emerald-200 group-hover:text-white"
															)}
														/>
														<span className="truncate">{item.name}</span>
													</Link>
												</li>
											);
										})}
									</ul>
								</li>
							</ul>
						</nav>
					</div>
				</SheetContent>
			</Sheet>

			{/* Main content */}
			<div className="lg:pl-80">
				{/* Top header */}
				<div className="sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-4 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
					<Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								className="lg:hidden hover:bg-emerald-50"
							>
								<Menu className="h-6 w-6" />
								<span className="sr-only">Open sidebar</span>
							</Button>
						</SheetTrigger>
					</Sheet>

					<div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
						<div className="flex flex-1 items-center">
							<div className="text-sm text-gray-600">
								<span className="font-medium">Welcome,</span>{" "}
								<span className="font-semibold text-emerald-600">
									{displayName.split(" ")[0]}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-x-4 lg:gap-x-6">
							<Button
								variant="ghost"
								size="sm"
								className="relative hover:bg-emerald-50"
							>
								<Bell className="h-6 w-6" />
								<Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center animate-pulse">
									3
								</Badge>
								<span className="sr-only">View notifications</span>
							</Button>

							{/* Mobile Profile Dropdown */}
							<div className="lg:hidden">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="sm" className="relative">
											<Avatar className="h-8 w-8 ring-2 ring-emerald-200">
												<AvatarImage src="/placeholder-user.jpg" />
												<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white font-bold text-xs">
													{displayName
														.split(" ")
														.slice(-2)
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="end"
										className="w-64 bg-white/95 backdrop-blur-sm"
									>
										<DropdownMenuLabel className="text-center">
											<div className="font-semibold text-sm">{displayName}</div>
											<div className="text-xs text-gray-500 font-normal">
												{user.email || `${user.role}@akeray.et`}
											</div>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem className="cursor-pointer">
											<User className="mr-2 h-4 w-4" />
											Profile
										</DropdownMenuItem>
										<DropdownMenuItem className="cursor-pointer">
											<Settings className="mr-2 h-4 w-4" />
											Settings
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											className="text-red-600 cursor-pointer"
											onClick={handleLogout}
										>
											<LogOut className="mr-2 h-4 w-4" />
											Logout
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</div>
				</div>

				{/* Page content */}
				<main className="py-8">
					<div className="px-4 sm:px-6 lg:px-8">{children}</div>
				</main>
			</div>
		</div>
	);
}
