import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import GamesPage from "../pages/GamesPage";
import PromotionPage from "../pages/PromotionPage";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import GameLogsPage from "../pages/GameLogsPage";
import DepositPage from "../pages/DepositPage";
import WithDrawPage from "../pages/WithDrawPage";
import TransactionPage from "../pages/TransactionPage";
import UserHomePage from "../pages/UserHomePage";
import HotGamesPage from "../pages/HotGamesPage";
import ContactPage from "../pages/ContactPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/home',
                element: <UserHomePage />
            },
            {
                path: '/games',
                element: <GamesPage />
            },
            {
                path: '/contact',
                element: <ContactPage />
            },
            {
                path: '/hotGames',
                element: <HotGamesPage />
            },
            {
                path: '/promotion',
                element: <PromotionPage />
            },
            {
                path: '/profile',
                element: <ProfilePage />
            },
            {
                path: '/deposit',
                element: <DepositPage />
            },
            {
                path: '/with-draw',
                element: <WithDrawPage />
            },
            {
                path: '/bonus-logs',
                element: <TransactionPage />
            },
            {
                path: '/transaction-history',
                element: <TransactionPage />
            },
            {
                path: '/game-logs',
                element: <GameLogsPage />
            },
            {
                path: '/edit-profile',
                element: <EditProfilePage />
            },
            {
                path: '/change-password',
                element: <ChangePasswordPage />
            },
        ]
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    }
])

export default router;