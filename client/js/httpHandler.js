(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  const ajaxGetFetch = (callback = ()=>{}) => {
    $.ajax({
      type: 'GET',
      // data:
      url: `${serverUrl}/moves`,
      success: (data) => {
        // console.log("direction", data);
        // console.log('GET move was a Success.');
        // invoke swimteam move with our pressed data string
        SwimTeam.move(data);
      }
    });
  };

// setInterval(()=>{
//   ajaxGetFetch();
//   },2000)

    const ajaxGetImage = (callback = ()=>{}) => {
    $.ajax({
      type: 'GET',
      // data:
      url: `${serverUrl}/image`,
      success: (data) => {
        console.log("image: ", data);
        console.log('GET image was a Success.');
        // invoke swimteam move with our pressed data string
        SwimTeam.setBackgroundImage(data);
      }
    });
  };

  ajaxGetImage();
  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  // ajax request
  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: 'http://127.0.0.1:3000',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // get Image
        // reload the page
        window.location = window.location.href;

      }
    });
  };
  //grabs form and on submit adds background image
  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }
    // call on post request with file
    ajaxFileUplaod(file);
  });

})();
