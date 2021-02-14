$(document).ready(function () {
  function handleSelect() {
    $('.form__input--select').selectize({ create: true, sortField: 'text' });
  }
  function handleStepForm() {    
    $('#demo').steps({
      onFinish: function () { alert('complete'); }
    });
  }

  handleSelect();
  handleStepForm()
}); 