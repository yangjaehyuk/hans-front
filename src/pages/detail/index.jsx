import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  HeartOutlined,
  SendOutlined,
  CopyOutlined,
  XOutlined,
} from '@ant-design/icons';
import { message, Dropdown, Menu } from 'antd';
import { TextBox } from '../../stores/atom/text-box';
import { DetailCarousel, DetailCard } from '../../components/detail';
const dummyData = [
  {
    title: '아이브',
    nickname: 'yangjaehyuk_',
    profileImg:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALIAvgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYBBwj/xABJEAABAwICBQgHBgQEAwkAAAACAAEDBBIFEQYTISIyMUFCUVJxkaEUYWJygbHBByMzgtHwJENT4TRzovFjktMVFiU1RJOywtL/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAjEQEBAAIDAQABBAMAAAAAAAAAAQIRAyExEiIEE0FRIzJh/9oADAMBAAIRAxEAPwD1uwQWP0yqhp6CeQuiLrWVkuqBeS/aLi15jRRF7R/Rl2Y9T6cepvSh9n7/APiRe79VutOsdLAdD6meMramYdRD1sZs7Zt62bN/gsDoAVmK+8OXyS+2jEylr8Mw0S3YY3qDH1u9o5+tmYvFa3/HDybyYIZRih3eLhH4cv0SkqLKYRHtf7qhrLzHsiuSyX+a5NulxnvO5SMRWWj+b1qFnU0Q3oMLYPhWtD0mfdiHgHrfr7kUxGlv1UEXCPRHk7/39VBQTlLNEPRHK0ebJslrYqemMLh3t749TM3ej/CkxAMIwOSrmGOId4st31dbr1LB9GYqGGK6PeH4v8XV3RPBBoabXyj9/J5N1LSuA2JLNqdQFCisQfHNFMPxYPv4BGX+oGx/0dasxUJCk1VOnz9pbofV4JNrB+8g6Mgj8+pZoTI/u5fyr6XxGhgq4SgnG4SHJeFaZYAWCYqUVv3RFcBJsannhJ4ADLZaXZ3S7kRArwuQxx37e0rlCe5aq41zZLK5knLiYhqS6kszi4nLmSwPdtLNIY6GmIiLe6IrxytqZKuplnl4iLNSYjiE+ITFJUld9FTVeTOXqeJ4Y2Td9afQH/zsfd+qzP2jVvpumGJyCW7CTQj+VmZ/NnRfResGir9eW7aLrEYhP6RUzzl/MkI/F3f6pc7+Eh8Z+W1VNd051EoLJQa9EaSApTtH99bqKGlIAi7UnCtbQ4X6JhRVZDxFqg9bc7t35Okt0phjtXwmmKWp1UXRFmL1c7/RbbQei/7QxgrvwKXIy959jN5Eszg0o0mG11TLxFJ8snf5+S2/2aSlT4PLUlBvVEmZF15ciG3Rrp6HGCcSEnjwhukNv76lNDXjUcJJtyF+b/K4Sidk5iTHJCjDJBWJ+0zCRrsEKcR+9p9vwWymqoA4pBFD8UkpqignjIhtKN28kBvj5wqWsMfdXaGSya3tF+v9lPi8dlSUf9PZ4ZsqAFYd3c6pjXLlBxJ2XWSVETclzJOSWY3JLJOySyWZOkkkyIOGVgF7roDS00ldWRU0XFIWQo1WP/DSl7Kj0Nh9Ix4R7Mb2975N9fNJnVeKfVC8QovR8Ynw+KUZtXK8LScjE7Pln6mzTKSiLXWzjbbxCrkYD/3nlH+WNTJ4M75fJFattaYy28PEXP8AFStWmEqbR6gLE8Y9mEfBmb/fwW50rpY6HDcMouG0TMu/Jh8r0M+zel37i/mE93izo9pl/EYqMBcMcF3i+35N4JbV8J1plWcYtEpytG6aSwfiz/qy2OGaV4Rg+DwQSFvRxtcPrybqzfyQau0fvwfDIB4pJBu8G/RaGLRKiCgnpKmDdqBa4h2OzttZ22PtZ9q0PZddOUmm2CYhNqx3Stz5i2Pltd22Nyts5dq0EDQGF0XS7Kz2EaL4bg5yyRFrpZo9VcQi1gu7O7ZM213dmzd+rxPYNh5U8Nt10V256m6u7PNGwsl+fyFIuBUayQuEUVij3CQWeOQzlKPiuyH1db/Bs0KXHtQlwqmPeqakh/MmSUVJqSGKe7d7Wbt3rH47onjdbjAiVTJJAU1wyEY2sO1tuzNtmWzkz5GflTsToK3D8YIcNu9GIbgG7Nm2Nnlt2dy2hmW7rTzbHGsxKpG67edvB8kNy/1Dkr2NCQVkolxXb3i7qjLuHb2VSOTL0bp3vhiL2WUmShoP8NF7OxTqkSriS6lkiBqWScuZLMmSSXVmVcSKyjL2slV0WrBosepJj3YiksPuf+7N4KbFy/hh95BRfpJMu6phfnuNLodBHV6f00dTvRSVMt3r3TdvF/mjuKUsUVMQiNpSZS97P+2WU0XmKLG6aceLWMPjsfyzXr+k+HUgaPRSyiIyjkwyc+TZO7Z9zPs9Sll66uLVgV9n+5CRfvl/syu42+txWsLs0zfPJvPNUtD9yGcfaVo9+prLulqA+Dm+f1QVwa8qUTrMPHsln4M/9loChGzhQaMr6+j91/kjonuIwOVWakiv4VKYCG6nZqvUS76PifvqYHVEQG8hVqn31Wd7KxBkUtD2SJVyw6P+aNyNOyq1HAtpSZX+3znp1SeiaQ1Mf/EzH47W+azcnGtt9prielstv9MXLvyZYknvuL2k88cvJ/tRnDP8N+b57VbyVbDvwfyiXk36K0qRCmpLqSIOJLuS4syVJdSyWYNxv8EfeQh23PzIvjP8r3kMYej/AMvfmyS+nni5hplEZEPEO8PqfJ/0WtoPtAI4ammxCk9KIorAuyYMhYnzduVn27WZZDDzvP8AzMx8n/fxVY49RUzj7Lv4uzfXyQPLZHqWiVVfd7SMlDZXl7Qxv4EX6rHaKVGq1Xw82W8itOpiL2m8Mnf6KVdWF6aEHsqab2c/k6NASHPEN4l2SV8OBEcrs/NDMRmnpDIhgKTs2/L1K21ZFfbcO6nFXU3SkFBsccv6CKHG9winj1JDxDdn5p2HYgOIV90XCKfW0eH1Z68pLfd50+i9Epw/hrVt9+myx63oWIlQrJhACUkkt4bqzWlVT6JhVTPd0XYe90xI8X0yrvTtIa6pH8LWWj62bZ9Fn8t9Wq+QTmLpb3y5VUbpJnLld3Y3hvB+Vvm6uZKph/BF/l/VXFSJU1JdSyRA1LJOXFgSpMkurCFY3/K95DzPiL97X/uieOj9zEXtIVG25+/31pKeJ6J7DiLsyZ+bf3UmLR2VJF0SH6s7/R/ioIXsuHu8nZF6unGopvaHJy7n2P8Av1IGFtHH1sIyD7vhs+i3mDzXnFd0S+n91iNBoSOgK7oyOthAOqNSvrq4/G6hkvhElcje8LUBw6sEwtJGaeQVtmsVa/BqSoC4qaMpR6RRtn48qESYRScwzD7kpfJ3WsB71DU0Ay+z7q1xV4f1Nw6rJnhkfRqai3s3N88s/NSYdgtMdYJFriGPe3pSdn72zyf4o0+EWH/iZPJStENOG6l+V+X9XMsdYn1DDTw7q8y+0nGR1I0QlvcZerqz83+C02mOkUGD0BTzlcXIEY8pk/IzLw/F6+eumlqakvvZPr9MtipHnZ5amg0nvTVJE25/q8nTGZO5x6hHci/y2Vt1BSD/APFh8lYTkNySyXUkQNdlxOXFgSpLuSWSzKuJQ62jL2d7wQOEeIez8udajLctQeejIJrh934fvZ4JcofGqoAP4nR4e59nnln4ItCxGG77wjzPs2sq0VEQbvRRSjhGwR7vH1IaUlaXQSlE4ZRHtXEPOy11RhxWXCPCsxotBJFWCUXCXSHY7ep2XpQRCYKN7rpx8ZMJdVukiNLiBB7qmxHCr+FATjnpztUu4rLK2VLWifSV8apYmmqZQVwcRIOK5PMwvHK1BVAoHj+M02G0ElXUyDHHGObl8mbrf1IfU41qg4SLyXm+n9TV4nDFrS3Rk3Yx4W2Pty53TS7pMvxm4B4rjVTpNjGsluGIc7I/6Yc7v63/AEQmrtM7ujy/o3hkitNSDSUG9ulNtL1Rt9XfyZC5AKXe7ReX7+SrpyW79MEb7i6VruuQR/xIj7SsPFYAj33F3s/0y8V3D4r6wi7OaMAXiGwE9JmXU6bi4nLizGricuLAmySTskmZZiZJxvTmZOyWExmUkAb9vaU9LQ1dWYjTU0khFw2i+Wzl28iLYLgk51ltTGUer4rutDLqbp8N26jQaJ0ZB94S3ETITQwDEFoiikK5/wDrrvicgvQ6toBlDhRUEiBbQS6Y2emKnNVpSWtrqD0gN3iWcqNH605t0d33knzVplKFOHpB2ofpJhuqhiIh6W8tnRYL6PvFxKppHQlUUEsA8XKJd21PhO0+S7mo8qr6f0g7R4i+nIqMtDZvFwj8m5V6xg2jNNUYIJEP4hO93I+x8vmz+KC4pofUxb0BDNEJZ28hd2XI/Ouj5ckvfbzqog/ffy/opqSn1Rl/q732ui2IYTU0h3VNNJHvZkRA7N48igtQgWmZJZJ+S47JyGOuJzsuZLAbklknJZLMmyXWZSBGRmIiJERcIjtd36mZa3A9A8QrbZMQ/goOyW2R29Tc3x5Op0BZKOMjMRiEiIuERHN37mZabA9CcSxAxKujKipukR7Dduph5Wf1vl8eRem4Tg9FhkOroaYYx6RcpH63fldERjWYMpKKOkpoqaAbYoxZhHqZlVq8J1R6+PpF5vtydHDjTwG8LUuc+po/Hfm7AYQVoBU8lLv2lxCoSk1R2lbcoa06t7TxrpyiCrtIR8KmaOKnDWVJf2WlA4Rll4RtSZyDi/2Ub4hRdGf/AFKVpIz6Xukt9QfmuEKqTRCZ6viIvJlakl1QFdwiqdIRHcXSLiLq9TLbHGLEYFEA00AiQj5c/WopaftWqOrxSOn+4ph1k5bBEfq/MnQsNPDr66Te6X9k0zo/sy906OIezcKG1ui+j+J/iUgxy9qLOMu/Jtjv3s6kqtI4A3YBu9rkZTU2I01du7pF4ppzdp5fpmSxH7NSDew3ELv+HUj/APYf/wArKYnozjOGb1TQyar+pFvj4tnl8cl7KBFFwlcPZL6PzK3EwyhdF/dn6nVJltz5cdxfOy4vdsa0aosWppRqaSPWkL21AizGD8z58vLzPsXhwREZjGI3ERWiI7Xd+pmblTJoUlpqDQTSKt3vQvRx7VSbR+T7fJEm+y7HS/8AU4X/AO7J/wBNDYt/g+A4fhIfwNMIl0pi3jfvd/k2TIuES6AqcQQ2OjGFOyT8hTmdAUWr7Sa5WbvCp2XDBbbKszjYREVto3EXqblQCC6uqSk4Ru8uZW8UmKoP0SL8IS+9Lrdub4c6lpgGnDdU8u66OPpPkNOF3SWVxquq6iYohH3d7PP9FZxzGoqfdu3uyn6KDFWwlWlvEMjgN3NkzPn5qWV3lqOrHD4x+qsUWjw2CVXJ+UPq6nqqT0SEpKHhjF31ZFmz5NyM/Lmr0riEwiWs9kRF3F3fr7lYcBPdLhT/ADNJfu5b2DyVA+jReklbrNhbr9+WxRNURS1MVJAX4hb1vUzO/wBPNLFKCfUy0wxlNBILiJCWRA/M/XsfnUmAYMNIcREJDybxlmZvlyvlyd21LJdrfWExtEpcNgiPWUkcYy+1nl5c6yuOhU+maupk9Y28jt1t1ram++gmmVF6Rg+sEfvYSYht5cn2O3mz/BUzx/HpD9PzWckl/lkSYVaoqoafdERFUKDC8UqAuGK0fbLLP4KSoo62n/Ej/MK5pHo5/wBNRRYhFLu9JXBMqc9ZF+YeZ1kcMqiim3t1amGUZQVsMnLy4QSgjjqzGS0SiLdIS25P1OysDhFFEYywUlNHKPDIMQs7dzs2bIRDNJSzayAt7pDzO3U60NJUx1cIyRfmHnZ+dnVvpwZ4fKlPGUR3FSSF7QEz/Js2ThnEv5U/xIvoiLOuuaxNKMdNU9KWPzdOKnt4prvdHJWHdNcPZ/5VmMABDhT2BIGHop+SO2MyQ7EqsgP0aAvvS4y7Dfq6t11WNJDdxEWwB63/AEQQRILiIriIsyLrdLT4Y7OijEOFRV1SMUJEXZUl6G1EZV1SMHRuuLubap29OnDEEocOnxasKrnG0S4RLq5mWrwqmjw+6MREYpN7d6+tWY4o4gtFNkMTSzHXauXJ9TS8yWaoxj2SIVK7zgF113vJ/pG4rKRGMX3hFbaqzVsYfi7qoV9WMp2xFcK0yLePLxeeuEz3RTcSqb6PVjxSZeDPn9FSp4CPeU7iIbxI5Z7mh4+LVlpUwWBaptXfxKodSIcKcFZ2kki+d7U8TwiM96LdIuHv6u5VqMii3S/MjJSie6XCSoSuN5DLvW8MnOhZAxzt9PIr1YoZ5KQ9YPCXEPW36qgEwgdt1xfvlV2Mr08peSStNFIMoDIPCQ3CuuyF4PUao/RpOEs3Dv5Xb6+KvVFUFO9rtmXUydxZTSU05JJEEUmyUXbY78r9amfYL5bNmaSSzM/iTu+IyZvnkzZZ8yUqSSWr4KpKPDvx5fdSSU174tyO/WqrpJJqnD2J2EMnfxU4ETx7Sfi61xJIaKlZtHbtVej/AB0kksdU8FpXfV8qGkRPyk7/ABSSTxDk9NFRz7OTZ3JJJ45XJndmF2d27k6R84Xd9r5cqSSSrYoYtkebcvWi8PAK6kjBvhx8cHvh80Wp9tTO77XzXUlSObk9f//Z',
    body: 'dive into iveasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddsdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    likesCount: 100,
    tagList: [
      {
        tagId: 1,
        body: '가을선배',
      },
      {
        tagId: 2,
        body: '달이',
      },
      {
        tagId: 2,
        body: '달이',
      },
      {
        tagId: 2,
        body: '달이',
      },
      {
        tagId: 2,
        body: '달이',
      },
      {
        tagId: 2,
        body: '달이',
      },
      {
        tagId: 2,
        body: '달이',
      },
      {
        tagId: 2,
        body: '달이',
      },
      {
        tagId: 2,
        body: '달이',
      },
      {
        tagId: 2,
        body: '아이브가을양재혁',
      },
    ],
    imgList: [
      {
        imgId: 1,
        imgUrl: 'https://newsimg.sedaily.com/2023/05/31/29PSLMRA4H_3.jpg',
        isThumbnail: 'true',
      },
      {
        imgId: 2,
        imgUrl:
          'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2023/08/05/548c4d1e-9d8f-4e4b-92c9-a4cbfdae232a.jpg',
        isThumbnail: 'false',
      },
    ],
    product: {
      productPrice: 100000,
      productImg:
        'data:image/png;base64,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',
      productUrl: 'http://www.starship-ent.com/',
      productName: '스타십엔터테인먼트',
    },
  },
];
const Detail = () => {
  const [isLike, setIsLike] = useState(false);
  const { postId } = useParams();
  const post = dummyData[0];
  function onClickShareTwitter() {
    const link = window.location.href;
    const twitterIntent = `https://twitter.com/intent/tweet?text=custom%20text&url=${link}`;
    window.open(twitterIntent, '_blank');
  }

  const handleLike = () => {
    setIsLike(!isLike);
    if (isLike) {
      post.likesCount--;
      // 변한 카운트를 api 요청
    } else {
      post.likesCount++;
      // 변한 카운트를 api 요청
    }
  };
  function handleCopyLink() {
    const link = window.location.href;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        message.success({
          content: (
            <TextBox typography="body3" fontWeight={'400'}>
              클립보드에 링크가 복사되었습니다.
            </TextBox>
          ),
          duration: 2,
          style: {
            width: '346px',
            height: '41px',
          },
        });
      })
      .catch((error) => {
        message.error(error.message);
      });
  }
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={handleCopyLink}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <CopyOutlined />
          <span>URL 복사</span>
        </div>
      </Menu.Item>
      <Menu.Item key="1" onClick={onClickShareTwitter}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <XOutlined />
          <span>엑스 공유</span>
        </div>
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );
  return (
    <DetailContainer>
      <PostWrapper>
        <PostImageWrapper>
          <DetailCarousel images={post.imgList}></DetailCarousel>
          {/* 캐러셀 */}
        </PostImageWrapper>
        <PostContentWrapper>
          <PostHeader>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ProfileImage src={post.profileImg} alt="Profile" />
              <TextBox typography="body3" fontWeight={'700'}>
                {post.nickname}
              </TextBox>
            </div>
          </PostHeader>
          <PostContent>
            <PostDescription>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <ProfileImage src={post.profileImg} alt="Profile" />
                </div>
                <TextBox typography="body3" fontWeight={'700'}>
                  {post.nickname}
                </TextBox>
                <div style={{ marginLeft: '10px' }}>
                  <TextBox typography="body3" fontWeight={'700'}>
                    {post.title}
                  </TextBox>
                </div>
              </div>
              <div style={{ marginLeft: '46px' }}>
                <TextBox typography="body2" fontWeight={'500'}>
                  {post.body}
                </TextBox>
                <TagListContainer>
                  {post.tagList.map((tag) => (
                    <Hashtags key={tag.tagId}>#{tag.body}</Hashtags>
                  ))}
                </TagListContainer>
              </div>
            </PostDescription>
            <LikeSectionDivider /> {/* 줄 추가 */}
            <LikeSection>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '10px',
                }}
              >
                <LikeIcon onClick={handleLike} islike={isLike} />
                <Dropdown overlay={menu} trigger={['click']}>
                  <SendIcon onClick={(e) => e.preventDefault()} />
                </Dropdown>
              </div>
              <LikeCount>좋아요 {post.likesCount}개</LikeCount>
            </LikeSection>
            <LikeSectionDivider /> {/* 줄 추가 */}
            <AdditionalImagesContainer>
              <TextBox typography="body2" fontWeight={'700'}>
                Related Products
              </TextBox>
              <DetailCard
                productPrice={post.product.productPrice}
                productImg={post.product.productImg}
                productUrl={post.product.productUrl}
                productName={post.product.productName}
              ></DetailCard>
            </AdditionalImagesContainer>
          </PostContent>
        </PostContentWrapper>
      </PostWrapper>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px; /* 위와의 간격을 띄우기 위해 추가 */
  line-height: 1.6; /* 기본 줄 간격 설정 */
  cursor: default;
`;

const PostWrapper = styled.div`
  border: 2px solid #dbdbdb; /* 외부 테두리 */
  border-radius: 10px; /* 둥근 테두리 적용 */
  width: 1000px; /* 너비를 1000px로 증가 */
  margin-bottom: 20px;
  background-color: white;
  display: flex; /* 가로로 나열하기 위해 flex 속성 추가 */
  overflow: hidden; /* 자식 요소의 테두리 반경을 부모에 맞추기 위해 추가 */
`;

const PostImageWrapper = styled.div`
  width: 60%; /* 이미지 영역을 60%로 설정 */
  height: inherit;
  border-right: 2px solid #dbdbdb; /* 내부 구분을 위한 테두리 */
`;

const PostContentWrapper = styled.div`
  width: 40%; /* 내용 영역을 40%로 설정 */
  display: flex;
  flex-direction: column;
  border-radius: 0 10px 10px 0; /* 내용 영역에 둥근 테두리 적용 */
  overflow: hidden;
  word-wrap: break-word;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 14px;
  border-bottom: 1px solid #dbdbdb;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 14px;
`;

const PostContent = styled.div`
  padding: 14px;
  border-bottom: 1px solid #dbdbdb; /* 내부 구분을 위한 테두리 */
`;

const LikeSectionDivider = styled.div`
  border-top: 1px solid #dbdbdb; /* 줄 추가 */
  margin: 10px 0; /* 줄 위아래 간격 추가 */
`;

const LikeSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const LikeIcon = styled(HeartOutlined).attrs((props) => ({
  style: {
    color: props.islike ? '#ff6f61' : 'black',
    fill: props.islike ? '#ff6f61' : 'transparent',
  },
}))`
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  padding: 5px;

  &:hover {
    color: #ff6f61;
  }
`;

const SendIcon = styled(SendOutlined)`
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: green;
  }
`;
const LikeCount = styled.span`
  font-weight: bold;
`;

const PostDescription = styled.div`
  margin-bottom: 10px;
  line-height: 1.6;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
`;

const TagListContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 자식 요소가 부모 요소의 너비를 초과할 경우 줄바꿈 */
  gap: 8px; /* 요소들 간의 간격 설정 */
`;
const Hashtags = styled.div`
  color: #00376b;
  line-height: 1.6;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AdditionalImagesContainer = styled.div`
  margin-bottom: 10vh;
`;

export default Detail;
