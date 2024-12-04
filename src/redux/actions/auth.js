// // src/redux/actions/auth.js
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../constants/authConstants';
// import { auth, db } from '../../../firebase/firebase'; // Nhập Auth từ file firebase.js
// import { doc, setDoc } from 'firebase/firestore'; // Nhập Firestore
// import { sendEmailVerification } from 'firebase/auth';
// import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

// // Action login
// export const login = (username, password) => dispatch => {
//     dispatch({ type: LOGIN_REQUEST });

//     return new Promise((resolve, reject) => {
//         // Kiểm tra xem username có phải là số điện thoại hay không
//         const isPhoneNumber = /^[0-9]+$/.test(username); // Kiểm tra chỉ có số

//         if (isPhoneNumber) {
//             // Nếu là số điện thoại, sử dụng số điện thoại để đăng nhập
//             signInWithEmailAndPassword(auth, username + '@example.com', password) // Chuyển đổi số điện thoại thành email tạm thời
//                 .then(userCredential => {
//                     dispatch({ type: LOGIN_SUCCESS, payload: { uid: userCredential.user.uid, email: userCredential.user.email } });
//                     resolve();
//                 })
//                 .catch(error => {
//                     dispatch({ 
//                         type: LOGIN_FAILURE, 
//                         payload: { 
//                             message: error.message,
//                             code: error.code 
//                         } 
//                     });
//                     reject(error);
//                 });
//         } else {
//             // Nếu không phải số điện thoại, sử dụng email để đăng nhập
//             signInWithEmailAndPassword(auth, username, password)
//                 .then(userCredential => {
//                     dispatch({ type: LOGIN_SUCCESS, payload: { uid: userCredential.user.uid, email: userCredential.user.email } });
//                     resolve();
//                 })
//                 .catch(error => {
//                     dispatch({ 
//                         type: LOGIN_FAILURE, 
//                         payload: { 
//                             message: error.message,
//                             code: error.code 
//                         } 
//                     });
//                     reject(error);
//                 });
//         }
//     });
// };

// // // Action signup
// // export const signup = (email, password, userData) => {
// //     return async (dispatch) => {
// //         dispatch({ type: SIGNUP_REQUEST });

// //         try {
// //             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
// //             const userId = userCredential.user.uid;

// //             await setDoc(doc(db, 'users', userId), {
// //                 email: userData.email,
// //                 name: userData.name,
// //                 phone: userData.phone,
// //             });

// //             console.log("User data saved successfully!");

// //             dispatch({ type: SIGNUP_SUCCESS });
// //         } catch (error) {
// //             console.error("Error saving user data to Firestore:", error);
// //             dispatch({ 
// //                 type: SIGNUP_FAILURE, 
// //                 payload: { 
// //                     message: error.message,
// //                     code: error.code 
// //                 } 
// //             });
// //         }
// //     };
// // };
// export const signup = (email, password, userData, method) => {
//     return async (dispatch) => {
//         dispatch({ type: SIGNUP_REQUEST });

//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const userId = userCredential.user.uid;

//             // Save user details in Firestore
//             await setDoc(doc(db, 'users', userId), {
//                 email: userData.email,
//                 name: userData.name,
//                 phone: userData.phone,
//             });

//             if (method === 'email') {
//                 // Send email verification
//                 await sendEmailVerification(userCredential.user);
//             } else if (method === 'phone') {
//                 // Setup Recaptcha for phone verification
//                 const appVerifier = new RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' }, auth);
//                 const phoneNumber = '+1' + userData.phone; // Assuming US number format, adjust for your country code
//                 await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//             }

//             dispatch({ type: SIGNUP_SUCCESS });
//         } catch (error) {
//             dispatch({ 
//                 type: SIGNUP_FAILURE, 
//                 payload: { message: error.message, code: error.code }
//             });
//         }
//     };
// };
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signInWithPhoneNumber, PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../constants/authConstants';
import { auth, db } from '../../../firebase/firebase'; 
import ava from '../../../assets/images/avatarcircle.png';
import { doc, setDoc } from 'firebase/firestore';
// Thêm import cho các component khác của bạn nếu có

// Action login
export const login = (username, password) => dispatch => {
    dispatch({ type: LOGIN_REQUEST });

    return new Promise((resolve, reject) => {
        const isPhoneNumber = /^[0-9]+$/.test(username); 

        if (isPhoneNumber) {
            signInWithEmailAndPassword(auth, username + '@example.com', password) 
                .then(userCredential => {
                    dispatch({ type: LOGIN_SUCCESS, payload: { uid: userCredential.user.uid, email: userCredential.user.email } });
                    resolve();
                })
                .catch(error => {
                    dispatch({ 
                        type: LOGIN_FAILURE, 
                        payload: { 
                            message: error.message,
                            code: error.code 
                        } 
                    });
                    reject(error);
                });
        } else {
            signInWithEmailAndPassword(auth, username, password)
                .then(userCredential => {
                    dispatch({ type: LOGIN_SUCCESS, payload: { uid: userCredential.user.uid, email: userCredential.user.email } });
                    resolve();
                })
                .catch(error => {
                    dispatch({ 
                        type: LOGIN_FAILURE, 
                        payload: { 
                            message: error.message,
                            code: error.code 
                        } 
                    });
                    reject(error);
                });
        }
    });
};
export const signup = (email, password, userData, method) => {
    return async (dispatch) => {
        dispatch({ type: SIGNUP_REQUEST });

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            // Save user details in Firestore
            await setDoc(doc(db, 'users', userId), {
                email: userData.email,
                name: userData.name,
                phone: userData.phone,
                password:userData.password,
                followersList:[],
                followingsList:[],
                follower: 0,
                following:0,
                avatar:'https://res.cloudinary.com/dh9ougddd/image/upload/uti8d5dnux7m0r5kss0m?_a=CAFAH2AfAAf0',
                posts:[],

            });

            console.log("User data saved successfully!");

            if (method === 'email') {
                // Send email verification
                await sendEmailVerification(userCredential.user);
                console.log("Verification email sent.");
            } else if (method === 'phone') {
                // Setup Recaptcha for phone verification
                const appVerifier = new RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' }, auth);
                const phoneNumber = '+1' + userData.phone; // Assuming US number format
                const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
                console.log("OTP sent to phone:", confirmationResult);
            }

            dispatch({ type: SIGNUP_SUCCESS });
        } catch (error) {
            console.error("Error during signup:", error); // Log the full error
            dispatch({ 
                type: SIGNUP_FAILURE, 
                payload: { message: error.message, code: error.code }
            });
        }
    };
};