<?php
/* -------------------------------------------------------------------------- */
/*                               Enqueue Script                               */
/* -------------------------------------------------------------------------- */
function enqueue_scripts() {

wp_localize_script( '%%SCRIPT-SLUG%%', "wp_ajax", ['base' => admin_url( 'admin-ajax.php' ), 'lasik_submit_endpoint' => admin_url('admin-ajax.php?action=lasik_quiz_submit')]);

}

// add_action( 'wp_enqueue_scripts', 'enqueue_scripts' ); 

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
/**
 * Get form fields array. This array can 
 * then be looped over to generate input elements
 * 
 * @param Number Form id
 * @return Array Needed form fields
 */
function generate_form_fields($form_id) {
  // LINK: https://docs.gravityforms.com/api-functions/#get-form
  $form = GFAPI::get_form( $form_id );
  
  // LINK: https://docs.gravityforms.com/form-object/

  // map through $form['fields'] and return only needed fields
  return array_map(function($field) {
    return [
      'type' => $field->type,
      'id' => $field->id,
      'required' => $field->isRequired,
      'visiblity' => $field->visibility,
      'choices' => $field->choices,
      'label' => $field->label,
      'subheading' => $field->description,
      'page' => $field->pageNumber,
      'className' => $field->cssClass
    ];
  }, $form['fields']);
}

/* -------------------------------------------------------------------------- */
/*                                Ajax Handlers                               */
/* -------------------------------------------------------------------------- */
function lasik_quiz_submit_action () {

  // remove action
  unset($_REQUEST['action']);
  
  // NOTE: param 2 here should be what comes in from $_REQUEST
  // but after looking at the source code, submit_form merges that param with
  // $_POST and uses that, but $input_values still has to be an array and 
  // and its not set to an empty by default. Really sloppy on gf tbh
  $submit_result = GFAPI::submit_form( 1, array() );
  
  // send back result
  wp_send_json_success($submit_result);

  die();

}

add_action("wp_ajax_lasik_quiz_submit", "lasik_quiz_submit_action");
add_action("wp_ajax_nopriv_lasik_quiz_submit", "lasik_quiz_submit_action");