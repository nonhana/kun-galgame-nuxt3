<script setup lang="ts"></script>

<template>
  <div class="article">
    <div class="title">執行条例（試行）</div>
    <div class="tips">
      <p>
        これは執行条例です。✔は既に実施されたことを示しています。目的はフォーラムの運営をより透明にすることであり、規則ではありません。
      </p>
    </div>

    <div class="moemoepoint">
      <h2>萌萌ポイント</h2>

      <div class="gain">
        <h3>取得方法</h3>
        <ul>
          <li>各登録ユーザーは初期に1007萌萌ポイントを所有しています ✔</li>
          <li>
            毎日サインインすることでランダムに0〜7萌萌ポイントを取得、サインインは毎日0時にリセット
            ✔
          </li>
          <li>
            トピックが返信されると、投稿者は2ポイントの萌萌ポイントを取得 ✔
          </li>
          <li>トピックがプッシュされると、3ポイントの萌萌ポイントを取得 ✔</li>
          <li>トピックが保存されると、1ポイントの萌萌ポイントを取得 ✔</li>
          <li>
            返信がコメントされると、投稿者は1ポイントの萌萌ポイントを取得 ✔
          </li>
          <li>返信がプッシュされると、1ポイントの萌萌ポイントを取得 ✔</li>
          <li>
            ユーザーのトピック/返信/コメントが「いいね」されると、1ポイントの萌萌ポイントを取得
            ✔
          </li>
          <li>ギャルゲームを投稿すると、3ポイントの萌萌ポイントを取得 ✔</li>
          <li>
            投稿されたギャルゲームが「いいね」やコメント、保存されると、投稿者は1ポイントの萌萌ポイントを取得
            ✔
          </li>
          <li>
            ギャルゲームリソースを投稿すると、3ポイントの萌萌ポイントを取得 ✔
          </li>
          <li>
            ギャルゲームのマージリクエストが承認されると、リクエストしたユーザーは1ポイントの萌萌ポイントを取得
            ✔
          </li>
          <li>
            ギャルゲームリソースが「いいね」されると、投稿者は1ポイントの萌萌ポイントを取得
            ✔
          </li>
          <li>
            ギャルゲームコメントが他の人からコメントされると、コメントされたユーザーは1ポイントの萌萌ポイントを取得
            ✔
          </li>
        </ul>
      </div>

      <div class="deduct">
        <h3>減点方法</h3>
        <ul>
          <li>
            ユーザーの不適切な行動により、重大度に応じて7、17、77、177、777ポイントの萌萌ポイントが減点されます
          </li>
          <li>
            トピックが10回低評価されると、確認後、100ポイントの萌萌ポイントが減点されます
          </li>
          <li>
            トピックをプッシュすると1回あたり7ポイントの萌萌ポイントが減点され、繰り返しプッシュ可能です
            ✔
          </li>
          <li>
            返信をプッシュすると1回あたり2ポイントの萌萌ポイントが減点され、繰り返しプッシュ可能です
            ✔
          </li>
        </ul>
      </div>
    </div>

    <div class="kungalgamer">
      <h2>ユーザー</h2>
      <ul>
        <li>
          <strong>
            萌萌ポイントが1000未満のユーザーはアカウントが削除されます
          </strong>
        </li>
        <li>
          萌萌ポイントが1100未満のユーザーは「トピックプッシュ」機能を使用できません
          ✔
        </li>
        <li>
          10回連続で「低評価」すると、アカウントが削除されます（批判よりも賞賛を推奨します）
        </li>
      </ul>
    </div>

    <div class="topic">
      <h2>トピック</h2>
      <ul>
        <li>
          ホームページ上のトピックは「動的プッシュ状態」にあり、「いいね」「コメント」「トピックプッシュ」などの影響を受けるとそのトピックがトップに表示されます
          ✔
        </li>
        <li>
          トピックの人気度計算式：人気度 = 閲覧数 × 0.1 + コメント数 × 2 +
          いいね数 × 2 + プッシュ数 × 50 – 低評価数 × 5 ✔
        </li>
        <li>
          トピックがプッシュされると、10時間以内に「流光」スタイルが適用されます
          ✔
        </li>
        <li>
          1つのトピックが10回低評価されると、そのトピックはシステムによって非表示となり、管理者の審査を受けます
        </li>
        <li>
          毎晩12時にトピックプールはリセットされ、前日の人気度が最も高い17個のトピックが残ります。人気度が同じ場合、すべてのトピックがプッシュされます。
        </li>
      </ul>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<style lang="scss" scoped>
.article {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 30px;
  margin: 17px 0;
  display: flex;
  justify-content: center;
}

.tips {
  border-top: 2px solid var(--kungalgame-blue-5);
  padding-top: 10px;

  span {
    cursor: pointer;
    border-bottom: 1px solid var(--kungalgame-blue-5);

    a {
      color: var(--kungalgame-blue-5);
    }
  }
}

h2 {
  margin-top: 30px;
  margin-bottom: 17px;
}

.moemoepoint ul {
  li {
    margin: 5px 0;
  }
}

.kungalgamer > ul {
  li {
    margin: 5px 0;
  }
}

.topic > ul {
  li {
    margin: 5px 0;
  }
}
</style>
