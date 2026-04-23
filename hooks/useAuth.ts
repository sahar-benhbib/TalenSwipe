import AsyncStorage from "@react-native-async-storage/async-storage";
import { Role, User } from "../constants/mockData";

const USERS_KEY = "talentswipe_users";
const SESSION_KEY = "talentswipe_session";

type SaveUserParams = {
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  password: string;
};

type StoredUser = User & { password: string };

export const saveUser = async (params: SaveUserParams): Promise<void> => {
  try {
    const newUser: StoredUser = {
      id: Date.now().toString(),
      name: params.fullName,
      email: params.email,
      phone: params.phone,
      role: params.role,
      password: params.password,
    };

    // Récupère la liste des users existants
    const existing = await AsyncStorage.getItem(USERS_KEY);
    const users: StoredUser[] = existing ? JSON.parse(existing) : [];

    // Vérifie si l'email existe déjà
    const index = users.findIndex((u) => u.email === params.email);
    if (index >= 0) {
      users[index] = newUser;
    } else {
      users.push(newUser);
    }

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    console.log("✅ User saved, total users:", users.length);
    console.log("✅ Users list:", JSON.stringify(users));
  } catch (e) {
    console.error("❌ Erreur saveUser:", e);
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<StoredUser | null> => {
  try {
    const existing = await AsyncStorage.getItem(USERS_KEY);
    console.log("🔍 All users:", existing);
    if (!existing) return null;

    const users: StoredUser[] = JSON.parse(existing);
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) return null;

    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  } catch (e) {
    console.error("❌ Erreur loginUser:", e);
    return null;
  }
};

export const getUser = async (): Promise<StoredUser | null> => {
  try {
    const session = await AsyncStorage.getItem(SESSION_KEY);
    console.log("🔍 getUser session:", session);
    if (!session) return null;
    return JSON.parse(session);
  } catch (e) {
    console.error("❌ Erreur getUser:", e);
    return null;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
    console.log("✅ Session cleared");
  } catch (e) {
    console.error("❌ Erreur logoutUser:", e);
  }
};

export const redirectByRole = (role: Role): string => {
  switch (role) {
    case "user":
      return "/(user)/swipe";
    case "recruteur":
      return "/(recruteur)/dashboard";
    case "entreprise":
      return "/(entreprise)/offres";
    default:
      return "/(auth)/login";
  }
};
