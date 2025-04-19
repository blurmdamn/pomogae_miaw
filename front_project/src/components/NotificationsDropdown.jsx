import { useEffect, useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { formatDistanceToNow, parseISO } from "date-fns";
import ru from "date-fns/locale/ru";

const NotificationsDropdown = () => {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("http://127.0.0.1:8000/api/notifications/list/", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then(setNotifications);
    }, []);

    const markAllAsRead = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("http://127.0.0.1:8000/api/notifications/mark_all_as_read", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                // После успешного запроса помечаем на фронте
                const updated = notifications.map((n) => ({ ...n, is_read: true }));
                setNotifications(updated);
            } else {
                console.error("Не удалось отправить запрос mark_all_as_read");
            }
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
        }
    };
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const newNotifications = notifications.filter(
        (n) => new Date(n.sent_at) > twentyFourHoursAgo && !n.is_read
    );
    const oldNotifications = notifications.filter(
        (n) => new Date(n.sent_at) <= twentyFourHoursAgo || n.is_read
    );

    const renderMessage = (msg) => {
        return msg.split("Ссылка:")[0].trim();
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="relative hover:text-pink-300 transition"
            >
                <BellIcon className="w-6 h-6" />
                {newNotifications.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#a13b45] text-white text-[10px] font-semibold w-4 h-4 flex items-center justify-center rounded-full shadow-sm ring-1 ring-white/20 animate-pulse">
                        {newNotifications.length}
                    </span>

                )}
            </button>


            ˝
            {open && (
                <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0 mt-2 w-[90vw] sm:w-96 bg-black/70 backdrop-blur-md text-white rounded-lg shadow-[0_0_12px_rgba(255,255,255,0.1)] border border-white/10 p-4 z-50 max-h-96 overflow-y-auto">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-lg">Уведомления</span>
                        {notifications.length > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-sm text-blue-300 hover:underline"
                            >
                                Пометить как прочитанные
                            </button>
                        )}
                    </div>

                    {notifications.length === 0 && (
                        <p className="text-gray-400 text-sm">Нет уведомлений</p>
                    )}

                    {newNotifications.length > 0 && (
                        <>
                            <h4 className="text-sm text-blue-200 font-semibold mt-2 mb-1">🔔 Новые</h4>
                            {newNotifications.map((n) => (
                                <div
                                    key={n.id}
                                    className="border-b border-white/20 pb-2 mb-2 text-sm"
                                >
                                    <p className="whitespace-pre-line">{renderMessage(n.message)}</p>
                                    <p className="text-xs text-gray-400">
                                        {formatDistanceToNow(parseISO(n.sent_at), {
                                            addSuffix: true,
                                            locale: ru,
                                        })}
                                    </p>
                                </div>
                            ))}
                        </>
                    )}

                    {oldNotifications.length > 0 && (
                        <>
                            <h4 className="text-sm text-gray-300 font-semibold mt-4 mb-1">📂 Старые</h4>
                            {oldNotifications.map((n) => (
                                <div
                                    key={n.id}
                                    className="border-b border-white/20 pb-2 mb-2 text-sm"
                                >
                                    <p className="whitespace-pre-line">{renderMessage(n.message)}</p>
                                    <p className="text-xs text-gray-500">
                                        {formatDistanceToNow(parseISO(n.sent_at), {
                                            addSuffix: true,
                                            locale: ru,
                                        })}
                                    </p>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationsDropdown;
