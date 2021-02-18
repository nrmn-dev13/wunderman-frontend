$(document).ready(function () {
  function handleSelect() {
    $('.form__input--select').selectize({ create: true, sortField: 'asc' });
  }
  function handleStepForm() {    
    $('#stepForm').steps();
  }
  handleSelect();
  handleStepForm()
}); 