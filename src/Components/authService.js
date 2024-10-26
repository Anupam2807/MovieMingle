    import { auth, googleProvider } from '../firebase';
    import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut,sendPasswordResetEmail } from 'firebase/auth';

    export const registerWithEmailPassword = async (email, password) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        throw new Error(error.message);
      }
    };

    export const loginWithEmailPassword = async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        throw new Error(error.message);
      }
    };

    export const loginWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;  
      } catch (error) {
        throw new Error(error.message);
      }
    };

    export const logoutUser = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        throw new Error(error.message);
      }
    };

