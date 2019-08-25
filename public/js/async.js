  function ajaxDatatables() {
    $('#databuku').DataTable({
      "responsive": true,
      "processing": true,
      "serverSide": false,
      "pageLength": 5,
      "language": {
          "url": "//cdn.datatables.net/plug-ins/1.10.19/i18n/Indonesian.json"
      },
      dom: 'Bfrtip',
      "ajax": {
          "data": "JSON",
          "type": "POST",
          "url": "/getDataBuku"
      },
      "columns": [
          {
            "data": "id", className: "table-center",
            render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            }
          },
          { "data": "nama_buku" },
          { "data": "nama_penulis" },
          { "data": "tgl_pembuatan", className: "table-center" },
      ],
        "columnDefs" : [
            {
                "targets": 4,
                "data": "buku_id", className: "table-center",
                "render": function (data, type, full, meta) {
                    return '<a id="'+full.buku_id+'" href="#" name="ubahData" id="ubahData" onclick="ubahData(this)" class="btn btn-secondary btn-sm"><i class="fa fa-edit" aria-hidden="true"></i> Ubah</a>&nbsp;<a id="'+full.buku_id+'" href="#" name="hapusBuku" id="hapusBuku" onclick="hapusBuku(this)" class="btn btn-danger btn-sm"><i class="fa fa-times" aria-hidden="true"></i> Hapus</a>';
                }
            }
        ],
      buttons : []
    });
};
$(function () {
    $("#tglPembuatan").datepicker({
        format: "mm/dd/yyyy",
        language: "id",
        todayHighlight: true,
    }).data("DatePicker").date(new Date());
});
$(document).ready(function () {
    ajaxDatatables();
});
function funcInputBuku() {
    event.preventDefault();
    var namaBuku      = $('#namaBuku').val();
    var namaPenulis   = $('#namaPenulis').val();
    var tglPembuatan  = $('#tglPembuatan').val();
    $.ajax({
        type: 'POST',
        url: '/tambahBuku',
        data: {"namaBuku": namaBuku, "namaPenulis": namaPenulis, "tglPembuatan": tglPembuatan},
        datatype: 'JSON',
        timeout: 30000,
        cache: false,
        success: function (data) {
        if (data.message == 'ok') {
            successNotify();
        } else {
            warningNotify();
        }
        },
        error: function (data) {
            alert('Something error! please try again.');
        }
    }).done(function() {
        $('#namaBuku').val('');
        $('#namaPenulis').val('');
        $('#tglPembuatan').val('');
        $('#databuku').DataTable().ajax.reload();
    });
};
function funcUpdateData() {
    event.preventDefault();
    var idbuku        = $('#mdlidbuku').val();
    var namaBuku      = $('#mdlnamaBuku').val();
    var namaPenulis   = $('#mdlnamaPenulis').val();
    // var tglPembuatan  = $('#mdltglPembuatan').val();
    $.ajax({
        type: 'POST',
        url: '/ubahData',
        data: {"idbuku": idbuku, "namaBuku": namaBuku, "namaPenulis": namaPenulis},
        // data: {"idbuku": idbuku, "namaBuku": namaBuku, "namaPenulis": namaPenulis, "tglPembuatan": tglPembuatan},
        datatype: 'JSON',
        timeout: 30000,
        cache: false,
        success: function (data) {
            console.log(data.message)
            if (data.message == 'ok') {
                successNotify();
            } else {
                warningNotify();
            }
        },
        error: function (data) {
            alert('Something error! please try again.');
        }
    })
    .done(function () {
        $('#databuku').DataTable().ajax.reload();
    });
};
function hapusBuku(id) {
    event.preventDefault();
    var message = "Anda yakin ingin menghapus?";
    if (!confirm(message)) {
        event.preventDefault();
    } else {
        var getID = $(id).attr("id");
        $.ajax({
            type: 'POST',
            url: '/hapusBuku/' + getID,
            datatype: 'JSON',
            timeout: 30000,
            cache: false,
            success: function (data) {
                if (data.message == 'ok') {
                    successNotify();
                } else {
                    warningNotify();
                }
            },
            error: function (data) {
                alert('Something error! please try again.');
            }
        })
        .done(function () {
            $('#databuku').DataTable().ajax.reload();
        });
    }
}
function ubahData(id) {
    event.preventDefault();
    var getID = $(id).attr("id");
    $.ajax({
        type: 'GET',
        url: '/ubahData/' + getID,
        datatype: 'JSON',
        timeout: 30000,
        cache: false,
        success: function (data) {
            jQuery.noConflict();
            $('#mdlUbahData').modal('show');
            $('#mdlidbuku').val(data.data[0].buku_id);
            $('#mdlnamaBuku').val(data.data[0].nama_buku);
            $('#mdlnamaPenulis').val(data.data[0].nama_penulis);
            $('#mdltglPembuatan').val(data.data[0].tgl_pembuatan);
        },
        error: function (data) {
            alert('Something error! please try again.');
        }
    })
}


var successNotify = function(){
$.notify({
    title: '<strong>[ Request Sukses ]</strong>',
    message: "<br> Aksi Telah Berhasil <em><strong>Dieksekusi.</strong></em>",
    icon: 'glyphicon glyphicon-ok',
},{
    // settings
    element: 'body',
    position: null,
    type: "success",
    allow_dismiss: true,
    newest_on_top: false,
    showProgressbar: false,
    placement: {
        from: "top",
        align: "right"
    },
    offset: 20,
    spacing: 10,
    z_index: 1031,
    delay: 3300,
    timer: 1000,
    mouse_over: null,
    animate: {
        enter: 'animated bounceIn',
        exit: 'animated bounceOut'
    },
    onShow: null,
    onShown: null,
    onClose: null,
    onClosed: null,
    icon_type: 'class',
    template:
            '<div data-notify="container" role="alert" class="col-12 col-sm-3 alert alert-{0}" style="margin: 15px 0 15px 0; width: 500px;">\
                <button type="button" class="close" data-notify="dismiss" style="top:7px;">\
                    <span aria-hidden="true">×</span>\
                    <span class="sr-only">Close</span>\
                </button>\
                <span data-notify="icon"></span>\
                <span data-notify="title">{1}</span>\
                <span data-notify="message" style="padding-right:15px">{2}</span>\
                <a href="{3}" target="{4}" data-notify="url"></a>\
            </div>'
});
}
var warningNotify = function(){
$.notify({
    title: '<strong>[ Request Gagal ]</strong>',
    message: "<br> Aksi Tidak Berhasil <em><strong>Dieksekusi.</strong></em>",
    icon: 'glyphicon glyphicon-ok',
},{
    // settings
    element: 'body',
    position: null,
    type: "danger",
    allow_dismiss: true,
    newest_on_top: false,
    showProgressbar: false,
    placement: {
        from: "top",
        align: "right"
    },
    offset: 20,
    spacing: 10,
    z_index: 1031,
    delay: 3300,
    timer: 1000,
    mouse_over: null,
    animate: {
        enter: 'animated bounceIn',
        exit: 'animated bounceOut'
    },
    onShow: null,
    onShown: null,
    onClose: null,
    onClosed: null,
    icon_type: 'class',
    template:
            '<div data-notify="container" role="alert" class="col-12 col-sm-3 alert alert-{0}" style="margin: 15px 0 15px 0; width: 500px;">\
                <button type="button" class="close" data-notify="dismiss" style="top:7px;">\
                    <span aria-hidden="true">×</span>\
                    <span class="sr-only">Close</span>\
                </button>\
                <span data-notify="icon"></span>\
                <span data-notify="title">{1}</span>\
                <span data-notify="message" style="padding-right:15px">{2}</span>\
                <a href="{3}" target="{4}" data-notify="url"></a>\
            </div>'
});
}