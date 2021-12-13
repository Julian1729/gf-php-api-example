/**
 * Handle form submit, send to ajax endpoint
 *
 * @param {Event} e
 */
const handleSubmit = (e) => {
  e.preventDefault();

  // get aggregated form vallues
  const formValues = new FormData(e.target);

  // send ajax (admin-ajax.php?action=lasik_quiz_submit)
  fetch(wp_ajax.lasik_submit_endpoint, {
    method: "POST",
    body: formValues,
  })
    .then((r) => r.json())
    .then(({ data }) => {
      console.log(data.confirmation_redirect);
      if (data.confirmation_redirect) {
        window.location.replace(data.confirmation_redirect);
      }
    });
};
