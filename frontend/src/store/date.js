import { create } from 'zustand';

export const useDateStore = create((set) => ({
    dates: [],
    setDates: (dates) => set({ dates }),

    fetchDates: async () => {
        try {
            const resp = await fetch("/api/dates", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await resp.json();
            set({ dates: data.data })
        } catch (error) {
            return { success: false, message: "Something went wrong. Please try again." }
        }
    },

    createDate: async (newDate) => {
        try {
            if (!newDate.name || !newDate.price || !newDate.image) {
                return { success: false, message: "Please fill in all the feilds." };
            }

            const resp = await fetch("/api/dates", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newDate)
            })
            const data = await resp.json();
            set((state) => ({ dates: [...state.dates, data.data] }))
            return { success: true, message: "Date created successfully!" };
        } catch (error) {
            return { success: false, message: "Something went wrong. Please try again." };
        }
    },

    updateDate: async (pid, updatedDate) => {
        try {
            const resp = await fetch(`/api/dates/${pid}`, {
                    method:"PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedDate)
                })
                const data = await resp.json();
                if(!data.success) {
                    return {success: false, message: data.message}
                }
                set((state) => ({ dates: state.dates.map((date) => date._id ===pid ? data.data : date)}));
                return {success: true, message: data.message}
        } catch (error) {
            return {success: false, message: "Something went wrong. Please try again."}
        }
    },

    deleteDate: async (pid) => {
        try {
            const resp = await fetch(`/api/dates/${pid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await resp.json();
            if(!data.success) {
                return {success: false, message: data.message}
            }
            set((state) => ({dates: state.dates.filter((date) => date._id !==pid)}));
            return {success: true, message: data.message}
        } catch (error) {
            return {success: false, message: "Something went wrong. Please try again"}
        }
    }
}));
