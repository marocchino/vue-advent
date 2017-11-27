<template>
  <div class="modal fade" id="newArticle">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h3 class="modal-title">{{newArticle.day}}일의 글</h3>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-5 col-md-offset-2">
              <form id="form" class='form form-horizontal'>
                <div class="form-group">
                  <label>제목</label>
                  <input class="form-control" v-model="newArticle.title" placeholder="미정">
                </div>
                <ul class="errors">
                  <li v-show="!validation.title">제목은 꼭 넣어주세요.</li>
                </ul>
                <div class="form-group">
                  <label>주소</label>
                  <input class="form-control" v-model="newArticle.url" placeholder="url: http://example.com">
                </div>
                <div class="form-group">
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default"
            data-dismiss="modal">닫기</button>
          <button class='btn' type="submit" @click.prevent="addArticle">예약</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>
