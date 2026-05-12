import supabase  from "../../../shared/services/supabaseClient";

export const authService = {
  login: async (email: string, password: string) => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: email, 
        password,
      });

    if (error) throw error;

    return data;
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  getUser: async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  },
};