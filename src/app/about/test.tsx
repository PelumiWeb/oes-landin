// const handleSubmit1 = (e) => {
//   e.preventDefault();
// //   const formData = new FormData();
// //   formData.append("fullname", name);
// //   formData.append("passidno", email);
// //   formData.append("phoneno", mobileNumber);
// //   formData.append("anyissue", msg);
// //   formData.append("companyname", school);
// //   formData.append("school", "OES_OER");
// //   formData.append("helpdeskperson", "Web-Enquiry");
// //   formData.append("whotosee", "The school Admin");
// //   formData.append("sessionyear", "2022/2023");

//   try {
//     // setSubmitted(true);
//     const response = axios({
//       method: "post",
//       url: FORM_ENDPOINT,
//       data: formData,
//       headers: { "Content-Type": "multipart/form-data" },
//     })
//       .then(function (response) {
//         //handle success
//         console.log(response);
//       })
//       .catch(function (response) {
//         //handle error
//         console.log(response);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// if (submitted) {
//   return (
//     <>
//       <div className="text-2xl">Thank you!</div>
//       <div className="text-md">
//         Information Submitted. We'll be in touch soon to offer our feedback.
//       </div>
//     </>
//   );
// }
