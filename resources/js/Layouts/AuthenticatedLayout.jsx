import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Refrigerator, BookOpen, Calendar, ShoppingCart, MessageSquare, Settings, Menu } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    const [touchStartX, setTouchStartX] = useState(0)

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX)
    }

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX
        const diff = touchEndX - touchStartX
        if (touchStartX < 30 && diff > 50) {
            setShowDrawer(true)
        }
        if (diff < -50) {
            setShowDrawer(false)
        }
    }

    return (
        <div 
            className="min-h-screen bg-gray-100"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd} 
        >
            <nav className="hidden sm:block border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('fridge.index')} active={route().current('fridge.index')}>
                                    冷蔵庫
                                </NavLink>
                                <NavLink href="/recipes" active={route().current('recipes.index')}>
                                    レシピ
                                </NavLink>
                                <NavLink href={route('calendar.index')} active={route().current('calendar.index')}>
                                    カレンダー
                                </NavLink>
                                <NavLink href={route('shopping.index')} active={route().current('shopping.index')}>
                                    買い物
                                </NavLink>
                                <NavLink href={route('prompt.index')} active={route().current('prompt.index')}>
                                    プロンプト
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('settings.index')} active={route().current('settings.index')}>
                            設定
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
            {/* スマホ用ドロワー */}
            <div
                className={`fixed inset-0 z-50 sm:hidden transition-opacity duration-300 ${showDrawer ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                {/* 背景オーバーレイ */}
                <div
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={() => setShowDrawer(false)}
                />
                {/* ドロワー本体 */}
                <div className={`absolute top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${showDrawer ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-4">
                        <div className="text-base font-medium text-gray-800 mb-1">{user.name}</div>
                        <div className="text-sm text-gray-500 mb-4">{user.email}</div>
                        <hr className="mb-4" />
                        <a href={route('settings.index')} className="block py-2 text-gray-700">設定</a>
                        <a href={route('profile.edit')} className="block py-2 text-gray-700">プロフィール</a>
                        <hr className="my-4" />
                        <Link href={route('logout')} method="post" as="button" className="block py-2 text-red-500">
                            ログアウト
                        </Link>
                    </div>
                </div>
            </div>

            {/* スマホ用ボトムナビゲーション */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 sm:hidden z-40">
                <div className="flex items-center h-16">
                    <a href={route('fridge.index')} className={`flex-1 flex flex-col items-center gap-1 text-xs ${route().current('fridge.index') ? 'text-blue-500' : 'text-gray-500'}`}>
                        <Refrigerator size={24} />
                        <span>冷蔵庫</span>
                    </a>
                    <a href="/recipes" className={`flex-1 flex flex-col items-center gap-1 text-xs ${route().current('recipes.index') ? 'text-blue-500' : 'text-gray-500'}`}>
                        <BookOpen size={24} />
                        <span>レシピ</span>
                    </a>
                    <a href={route('calendar.index')} className={`flex-1 flex flex-col items-center gap-1 text-xs ${route().current('calendar.index') ? 'text-blue-500' : 'text-gray-500'}`}>
                        <Calendar size={24} />
                        <span>カレンダー</span>
                    </a>
                    <a href={route('shopping.index')} className={`flex-1 flex flex-col items-center gap-1 text-xs ${route().current('shopping.index') ? 'text-blue-500' : 'text-gray-500'}`}>
                        <ShoppingCart size={24} />
                        <span>買い物</span>
                    </a>
                    <a href={route('prompt.index')} className={`flex-1 flex flex-col items-center gap-1 text-xs ${route().current('prompt.index') ? 'text-blue-500' : 'text-gray-500'}`}>
                        <MessageSquare size={24} />
                        <span>プロンプト</span>
                    </a>
                    <button
                        onClick={() => setShowDrawer(true)}
                        className="flex-1 flex flex-col items-center gap-1 text-xs text-gray-500"
                    >
                        <Menu size={24} />
                        <span>メニュー</span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
