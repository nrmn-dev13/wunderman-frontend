$(document).ready(function () {
  function handleSelect() {
    $('.form__input--select').selectize({ create: true, sortField: 'text' });
  }
  function handleStepForm() {    
    $('#stepForm').steps();
  }
  handleSelect();
  handleStepForm()
}); 