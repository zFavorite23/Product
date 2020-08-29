<template>
  <div class="model">
    <div class="add" @click="addShow = true">
      <i class="el-icon-plus"></i>
      新建模式
    </div>
    <div class="name">
      <span>模式名称</span>
      <div class="data">
        <span
          v-for="(item, index) in modelList"
          :key="index"
          @click="onselec(index, item.modelId, item.name)"
          :class="{ active: index == current }"
        >
          <i v-show="item.textShow">{{ item.name }}</i>
          <i class="el-icon-edit-outline" v-show="item.delShow" @click="onEdit(index)"></i>
          <input
            type="text"
            v-show="item.inputshow"
            v-model.trim="message"
            @blur="keyupInupt()"
            maxlength="6"
          />
          <i class="el-icon-delete" v-show="item.delShow" @click="delShow = true"></i>
        </span>
      </div>

      <!-- 添加模式 -->
      <div class="addModel" v-show="addShow">
        <span>新建模式名称</span>
        <input type="text" v-model.trim="ModelName" maxlength="6" />
        <div class="select">
          <div class="confirm" @click="addModel">确定</div>
          <div class="cancel" @click="addShow = false">取消</div>
        </div>
      </div>

      <!--  删除模式 -->
      <div class="delModel" v-show="delShow">
        <span>是否删除当前模式</span>
        <div class="select" style="margin-top:20px">
          <div class="confirm" @click="delModel()">确定</div>
          <div class="cancel" @click="delShow = false">取消</div>
        </div>
      </div>

      <!-- 编辑模式 -->
      <div class="editModel" v-show="editShow">
        <span>是否保存当前模式</span>
        <div class="select" style="margin-top:20px">
          <div class="confirm" @click="confirmEdit()">确定</div>
          <div class="cancel" @click="editShow = false">取消</div>
        </div>
      </div>
    </div>

    <!-- 修改模式 -->
    <div class="edit" :class="{ on: onClick }">
      <span>编辑面板</span>
      <div class="info" v-show="modelList.length != 0">
        <div style="position: relative;margin-bottom: 10px;">
          <span style="color: #15f6f3">模式选择</span>
          <input style="top:5px" class="radio" type="radio" value="1" v-model="modeInfo.pattern" />
          <span>普通模式</span>
          <input style="top:5px" class="radio2" type="radio" value="0" v-model="modeInfo.pattern" />
          <span style="margin-left:35px;">智慧模式</span>
        </div>
        <div style="position: relative">
          <span style="color: #15f6f3">开关控制</span>
          <input
            style="top:5px"
            class="radio"
            type="radio"
            name="radios"
            value="1"
            v-model="modeInfo.status"
          />
          <span>光照开关</span>
          <input
            style="top:5px"
            class="radio2"
            type="radio"
            name="radios"
            value="0"
            v-model="modeInfo.status"
          />
          <span style="margin-left:35px">时段开关</span>
        </div>
        <div v-if="modeInfo.status == 1">
          <select
            v-if="onClick == false"
            style="margin-left:115px"
            placeholder="请选择省份"
            @change="getProv()"
            v-model="modeInfo.province"
          >
            <option
              v-for="(item, index) in provs"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></option>
          </select>

          <select v-if="onClick == false" v-model="modeInfo.city">
            <option
              v-for="(item, index) in citys"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></option>
          </select>
          <input type="text" v-if="onClick == true" v-model="modeInfo.sesson" />

          <select v-if="onClick == false" v-model="modeInfo.sesson">
            <option
              v-for="(item, index) in sessons"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></option>
          </select>
        </div>
        <div v-if="modeInfo.status == 0">
          <span style="margin-left:115px;margin-right:40px">添加开启时间</span>
          <input
            type="text"
            style="width:157px"
            placeholder="添加开始时间"
            v-model="modeInfo.openTime"
            maxlength="5"
          />
        </div>
        <div>
          <span style="margin-left:115px;margin-right:40px">添加关闭时间</span>
          <input
            type="text"
            style="width:157px"
            placeholder="添加关闭时间"
            v-model="modeInfo.downTime"
            maxlength="5"
          />
        </div>
        <div v-if="modeInfo.pattern == 1" style="margin-top: 10px;">
          <nav v-for="(item, index) in modeInfo.selfData" :key="index">
            <span style="color: #15f6f3">亮度控制</span>
            <span style="margin-right:68px">时间亮度</span>
            <input
              style=" width:100px"
              type="text"
              placeholder="开始时间"
              maxlength="5"
              v-model="item.selfTime"
            />
            <input
              style=" width:100px"
              placeholder="开始亮度"
              type="text"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              v-model.number="item.lightNess"
              oninput="if(value>100)value=100;if(value<0)value=10"
            />%
            <i class="el-icon-circle-plus" @click="add()"></i>
            <i class="el-icon-remove" @click="del(index)"></i>
          </nav>
        </div>
        <div v-if="modeInfo.pattern == 0" style="margin-top: 10px;">
          <span style="color: #15f6f3">感应控制</span>
          <span style="margin-right:0px">有人时亮度</span>
          <input
            type="text"
            style="margin-left:54px;width:40px"
            placeholder="填写有人时亮度"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            v-model.number="modeInfo.oneLightness"
            oninput="if(value>100)value=100;if(value<0)value=10"
          />
          %
        </div>
        <div v-if="modeInfo.pattern == 0">
          <span style="margin-left:117px">无人时亮度</span>
          <input
            style="margin-left:-7px;width:40px"
            type="text"
            placeholder="填写无人时亮度"
            onkeyup="value=value.replace(/[^\d]/g,'')"
            v-model.number="modeInfo.noLightness"
            oninput="if(value>100)value=100;if(value<0)value=10"
          />
          %
        </div>
      </div>
      <div class="select" v-show="modelList.length != 0">
        <div class="confirm" @click="editShow = true">保存</div>
        <!-- <div class="cancel" @click="cancelEdit">取消</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onClick: true, // 是否开启点击
      current: -1, // 默认样式
      modelList: [], // 模式列表
      addShow: false, // 新增显示状态
      delShow: false, // 删除显示状态
      editShow: false,
      message: "", //编辑输入框内容
      newGroup: "", // 新增模式
      modelId: "", // 当前模式id
      modeInfo: "", // 模式回显详情
      ModelName: "",
      name: "", // 用来缓存取消时的模式名称
      provs: [
        { label: "北京市", value: "北京市" },
        { label: "天津市", value: "天津市" },
        { label: "河北省", value: "河北省" },
        { label: "山西省", value: "山西省" },
        { label: "内蒙古自治区", value: "内蒙古自治区" },
        { label: "辽宁省", value: "辽宁省" },
        { label: "吉林省", value: "吉林省" },
        { label: "黑龙江省", value: "黑龙江省" },
        { label: "上海市", value: "上海市" },
        { label: "江苏省", value: "江苏省" },
        { label: "浙江省", value: "浙江省" },
        { label: "安徽省", value: "安徽省" },
        { label: "福建省", value: "福建省" },
        { label: "江西省", value: "江西省" },
        { label: "山东省", value: "山东省" },
        { label: "河南省", value: "河南省" },
        { label: "湖北省", value: "湖北省" },
        { label: "湖南省", value: "湖南省" },
        { label: "广东省", value: "广东省" },
        { label: "广西壮族自治区", value: "广西壮族自治区" },
        { label: "海南省", value: "海南省" },
        { label: "重庆市", value: "重庆市" },
        { label: "四川省", value: "四川省" },
        { label: "贵州省", value: "贵州省" },
        { label: "云南省", value: "云南省" },
        { label: "西藏自治区", value: "西藏自治区" },
        { label: "陕西省", value: "陕西省" },
        { label: "甘肃省", value: "甘肃省" },
        { label: "青海省", value: "青海省" },
        { label: "宁夏回族自治区", value: "宁夏回族自治区" },
        { label: "新疆维吾尔自治区", value: "新疆维吾尔自治区" },
        { label: "台湾省", value: "台湾省" },
        { label: "香港特别行政区", value: "香港特别行政区" },
        { label: "澳门特别行政区", value: "澳门特别行政区" }
      ],
      citys: [],
      sessons: [
        { label: "春", value: "春" },
        { label: "夏", value: "夏" },
        { label: "秋", value: "秋" },
        { label: "冬", value: "冬" }
      ]
    };
  },
  methods: {
    // 点击添加样式
    onselec(index, modelId, name) {
      this.current = index;
      this.modelId = modelId;
      this.name = name;
      for (let i = 0; i < this.modelList.length; i++) {
        if (index == i) {
          // icon图标
          this.modelList[i].delShow = true;
        } else {
          // icon图标
          this.modelList[i].delShow = false;
          // 文字
          this.modelList[i].textShow = true;
          // 输入框
          this.modelList[i].inputshow = false;
        }
      }
      this.onClick = false;
      // 获取模式详情
      this.modelEcho(modelId);
      this.getProv();
    },

    // 获取所有模式
    getModel() {
      this.$axios({
        method: "GET",
        url: "/lighting/model/all"
      }).then(res => {
        // console.log(res);
        this.modelList = res.data.data;
        this.modelList.reverse();
        this.modelEcho(this.modelList[0].modelId);
        this.modelList.forEach(item => {
          this.$set(item, "textShow", true);
        });
      });
    },

    add() {
      this.modeInfo.selfData.push({ selfTime: "", lightNess: "" });
      if (this.modeInfo.selfData.length > 3) {
        this.modeInfo.selfData.length = 3;
      }
    },

    del(index) {
      if (this.modeInfo.selfData.length > 1) {
        this.modeInfo.selfData.splice(index, 1);
      }
    },

    // 添加模式
    addModel() {
      this.$axios({
        method: "post",
        url: "/lighting/model/addModel",
        data: {
          name: this.ModelName,
          province: "北京市",
          city: "北京市",
          downTime: "22:00",
          noLightness: 10,
          oneLightness: 100,
          openTime: "18:00",
          selfData: [
            {
              lightNess: "",
              selfTime: ""
            }
          ],
          sesson: "春",
          status: 0,
          pattern: 0
        }
      }).then(res => {
        // 进行判断
        if (res.data.code === 1) {
          confirm(res.data.msg);
          this.ModelName = "";
          return;
        }
        this.newModel = res.config.data;

        // 将新分组添加
        this.modelList.push(this.newModel);
        // 关闭弹窗
        this.addShow = !this.addShow;
        // 获取所有模式
        this.getModel();
        // 清除缓存
        this.ModelName = "";
      });
    },

    // 删除模式
    delModel() {
      this.$axios({
        method: "GET",
        url: `/lighting/model/delModel/${this.modelId}`
      }).then(() => {
        // 获取所有模式
        this.getModel();
        this.delShow = false;
        this.current = -1;
        this.onClick = true;
      });
    },

    // 修改模式
    editModel(modelId) {
      this.$axios({
        method: "POST",
        url: "/lighting/model/updateModel",
        data: {
          modelId,
          name: this.name,
          city: this.modeInfo.city, // 所属城市
          sesson: this.modeInfo.sesson, // 所属季节
          province: this.modeInfo.province,
          openTime: this.modeInfo.openTime, // 开启时间
          downTime: this.modeInfo.downTime, // 关闭时间
          selfData: this.modeInfo.selfData,
          noLightness: this.modeInfo.noLightness, // 无人时亮度
          oneLightness: this.modeInfo.oneLightness, // 有人时亮度
          status: this.modeInfo.status, // 开关模式
          pattern: this.modeInfo.pattern // 模式
        }
      }).then(res => {
        console.log(res);
        // 获取所有模式
        this.getModel();
      });
    },

    // 编辑模式名称
    editModel_2(name, modelId) {
      this.$axios({
        method: "post",
        url: "/lighting/model/updateModel",
        data: {
          modelId,
          name,
          city: this.modeInfo.city, // 所属城市
          sesson: this.modeInfo.sesson, // 所属季节
          province: this.modeInfo.province,
          openTime: this.modeInfo.openTime, // 开启时间
          downTime: this.modeInfo.downTime, // 关闭时间
          selfData: this.modeInfo.selfData,
          noLightness: this.modeInfo.noLightness, // 无人时亮度
          oneLightness: this.modeInfo.oneLightness, // 有人时亮度
          status: this.modeInfo.status // 开关模式
        }
      }).then(res => {
        console.log(res);
        // 获取所有分组
        this.getModel();
      });
    },

    // 点击编辑按钮
    onEdit(index) {
      for (var i = 0; i < this.modelList.length; i++) {
        if (index == i) {
          // 输入框
          this.modelList[i].inputshow = true;
          // 文字
          this.modelList[i].textShow = false;
        } else {
          // 输入框
          this.modelList[i].inputshow = false;
        }
      }
    },

    // 确定修改
    confirmEdit() {
      var reg = /^(20|21|22|23|[0-1]\d):[0-5]\d/;
      var regExp = new RegExp(reg);
      if (!regExp.test(this.modeInfo.openTime)) {
        alert("时间格式不正确，正确格式为：12:00");
        return;
      } else if (!regExp.test(this.modeInfo.downTime)) {
        alert("时间格式不正确，正确格式为：12:00");
        return;
      } else if (
        this.modeInfo.pattern == 1 &&
        this.modeInfo.selfData.length == 1 &&
        !regExp.test(this.modeInfo.selfData[0].selfTime)
      ) {
        alert("时间格式不正确，正确格式为：12:00");
        return;
      } else if (
        this.modeInfo.pattern == 1 &&
        this.modeInfo.selfData.length == 2 &&
        !regExp.test(this.modeInfo.selfData[1].selfTime)
      ) {
        alert("时间格式不正确，正确格式为：12:00");
        return;
      } else if (
        this.modeInfo.pattern == 1 &&
        this.modeInfo.selfData.length == 3 &&
        !regExp.test(this.modeInfo.selfData[2].selfTime)
      ) {
        alert("时间格式不正确，正确格式为：12:00");
        return;
      }
      // 调用修改模式
      this.editModel(this.modelId);
      // 清空输入框
      this.message = "";
      this.onClick = true;
      this.current = -1;
      this.editShow = false;
    },

    // 失去光标修改名称
    keyupInupt() {
      // 调用修改分组
      this.editModel_2(this.message, this.modelId);
      // 清空输入框
      this.message = "";
    },

    // 取消修改
    cancelEdit() {
      for (var i = 0; i < this.modelList.length; i++) {
        this.modelList[i].inputshow = false;
        this.modelList[i].textShow = true;
      }
      this.onClick = true;
      this.current = -1;
    },

    //  模式回显
    modelEcho(modelId) {
      this.$axios({
        method: "get",
        url: "/lighting/model/listById",
        params: {
          modelId
        }
      }).then(res => {
        // console.log(res);
        this.modeInfo = res.data.data;
        console.log(this.modeInfo);
      });
    },

    /*二级联动选择地区*/
    getProv() {
      let tempCity = [];
      this.citys = [];
      let allCity = [
        {
          prov: "北京市",
          label: "北京市"
        },
        {
          prov: "天津市",
          label: "天津市"
        },
        {
          prov: "河北省",
          label: "石家庄市"
        },
        {
          prov: "河北省",
          label: "唐山市"
        },
        {
          prov: "河北省",
          label: "秦皇岛市"
        },
        {
          prov: "河北省",
          label: "邯郸市"
        },
        {
          prov: "河北省",
          label: "邢台市"
        },
        {
          prov: "河北省",
          label: "保定市"
        },
        {
          prov: "河北省",
          label: "张家口市"
        },
        {
          prov: "河北省",
          label: "承德市"
        },
        {
          prov: "河北省",
          label: "沧州市"
        },
        {
          prov: "河北省",
          label: "廊坊市"
        },
        {
          prov: "河北省",
          label: "衡水市"
        },
        {
          prov: "山西省",
          label: "太原市"
        },
        {
          prov: "山西省",
          label: "大同市"
        },
        {
          prov: "山西省",
          label: "阳泉市"
        },
        {
          prov: "山西省",
          label: "长治市"
        },
        {
          prov: "山西省",
          label: "晋城市"
        },
        {
          prov: "山西省",
          label: "朔州市"
        },
        {
          prov: "山西省",
          label: "晋中市"
        },
        {
          prov: "山西省",
          label: "运城市"
        },
        {
          prov: "山西省",
          label: "忻州市"
        },
        {
          prov: "山西省",
          label: "临汾市"
        },
        {
          prov: "山西省",
          label: "吕梁市"
        },
        {
          prov: "内蒙古自治区",
          label: "呼和浩特市"
        },
        {
          prov: "内蒙古自治区",
          label: "包头市"
        },
        {
          prov: "内蒙古自治区",
          label: "乌海市"
        },
        {
          prov: "内蒙古自治区",
          label: "赤峰市"
        },
        {
          prov: "内蒙古自治区",
          label: "通辽市"
        },
        {
          prov: "内蒙古自治区",
          label: "鄂尔多斯市"
        },
        {
          prov: "内蒙古自治区",
          label: "呼伦贝尔市"
        },
        {
          prov: "内蒙古自治区",
          label: "巴彦淖尔市"
        },
        {
          prov: "内蒙古自治区",
          label: "乌兰察布市"
        },
        {
          prov: "内蒙古自治区",
          label: "兴安盟"
        },
        {
          prov: "内蒙古自治区",
          label: "锡林郭勒盟"
        },
        {
          prov: "内蒙古自治区",
          label: "阿拉善盟"
        },
        {
          prov: "辽宁省",
          label: "沈阳市"
        },
        {
          prov: "辽宁省",
          label: "大连市"
        },
        {
          prov: "辽宁省",
          label: "鞍山市"
        },
        {
          prov: "辽宁省",
          label: "抚顺市"
        },
        {
          prov: "辽宁省",
          label: "本溪市"
        },
        {
          prov: "辽宁省",
          label: "丹东市"
        },
        {
          prov: "辽宁省",
          label: "锦州市"
        },
        {
          prov: "辽宁省",
          label: "营口市"
        },
        {
          prov: "辽宁省",
          label: "阜新市"
        },
        {
          prov: "辽宁省",
          label: "辽阳市"
        },
        {
          prov: "辽宁省",
          label: "盘锦市"
        },
        {
          prov: "辽宁省",
          label: "铁岭市"
        },
        {
          prov: "辽宁省",
          label: "朝阳市"
        },
        {
          prov: "辽宁省",
          label: "葫芦岛市"
        },
        {
          prov: "吉林省",
          label: "长春市"
        },
        {
          prov: "吉林省",
          label: "吉林市"
        },
        {
          prov: "吉林省",
          label: "四平市"
        },
        {
          prov: "吉林省",
          label: "辽源市"
        },
        {
          prov: "吉林省",
          label: "通化市"
        },
        {
          prov: "吉林省",
          label: "白山市"
        },
        {
          prov: "吉林省",
          label: "松原市"
        },
        {
          prov: "吉林省",
          label: "白城市"
        },
        {
          prov: "吉林省",
          label: "延边朝鲜族自治州"
        },
        {
          prov: "黑龙江省",
          label: "哈尔滨市"
        },
        {
          prov: "黑龙江省",
          label: "齐齐哈尔市"
        },
        {
          prov: "黑龙江省",
          label: "鸡西市"
        },
        {
          prov: "黑龙江省",
          label: "鹤岗市"
        },
        {
          prov: "黑龙江省",
          label: "双鸭山市"
        },
        {
          prov: "黑龙江省",
          label: "大庆市"
        },
        {
          prov: "黑龙江省",
          label: "伊春市"
        },
        {
          prov: "黑龙江省",
          label: "佳木斯市"
        },
        {
          prov: "黑龙江省",
          label: "七台河市"
        },
        {
          prov: "黑龙江省",
          label: "牡丹江市"
        },
        {
          prov: "黑龙江省",
          label: "黑河市"
        },
        {
          prov: "黑龙江省",
          label: "绥化市"
        },
        {
          prov: "黑龙江省",
          label: "大兴安岭地区"
        },
        {
          prov: "上海市",
          label: "上海市"
        },
        {
          prov: "江苏省",
          label: "南京市"
        },
        {
          prov: "江苏省",
          label: "无锡市"
        },
        {
          prov: "江苏省",
          label: "徐州市"
        },
        {
          prov: "江苏省",
          label: "常州市"
        },
        {
          prov: "江苏省",
          label: "苏州市"
        },
        {
          prov: "江苏省",
          label: "南通市"
        },
        {
          prov: "江苏省",
          label: "连云港市"
        },
        {
          prov: "江苏省",
          label: "淮安市"
        },
        {
          prov: "江苏省",
          label: "盐城市"
        },
        {
          prov: "江苏省",
          label: "扬州市"
        },
        {
          prov: "江苏省",
          label: "镇江市"
        },
        {
          prov: "江苏省",
          label: "泰州市"
        },
        {
          prov: "江苏省",
          label: "宿迁市"
        },
        {
          prov: "浙江省",
          label: "杭州市"
        },
        {
          prov: "浙江省",
          label: "宁波市"
        },
        {
          prov: "浙江省",
          label: "温州市"
        },
        {
          prov: "浙江省",
          label: "嘉兴市"
        },
        {
          prov: "浙江省",
          label: "湖州市"
        },
        {
          prov: "浙江省",
          label: "绍兴市"
        },
        {
          prov: "浙江省",
          label: "金华市"
        },
        {
          prov: "浙江省",
          label: "衢州市"
        },
        {
          prov: "浙江省",
          label: "舟山市"
        },
        {
          prov: "浙江省",
          label: "台州市"
        },
        {
          prov: "浙江省",
          label: "丽水市"
        },
        {
          prov: "安徽省",
          label: "合肥市"
        },
        {
          prov: "安徽省",
          label: "芜湖市"
        },
        {
          prov: "安徽省",
          label: "蚌埠市"
        },
        {
          prov: "安徽省",
          label: "淮南市"
        },
        {
          prov: "安徽省",
          label: "马鞍山市"
        },
        {
          prov: "安徽省",
          label: "淮北市"
        },
        {
          prov: "安徽省",
          label: "铜陵市"
        },
        {
          prov: "安徽省",
          label: "安庆市"
        },
        {
          prov: "安徽省",
          label: "黄山市"
        },
        {
          prov: "安徽省",
          label: "滁州市"
        },
        {
          prov: "安徽省",
          label: "阜阳市"
        },
        {
          prov: "安徽省",
          label: "宿州市"
        },
        {
          prov: "安徽省",
          label: "六安市"
        },
        {
          prov: "安徽省",
          label: "亳州市"
        },
        {
          prov: "安徽省",
          label: "池州市"
        },
        {
          prov: "安徽省",
          label: "宣城市"
        },
        {
          prov: "福建省",
          label: "福州市"
        },
        {
          prov: "福建省",
          label: "厦门市"
        },
        {
          prov: "福建省",
          label: "莆田市"
        },
        {
          prov: "福建省",
          label: "三明市"
        },
        {
          prov: "福建省",
          label: "泉州市"
        },
        {
          prov: "福建省",
          label: "漳州市"
        },
        {
          prov: "福建省",
          label: "南平市"
        },
        {
          prov: "福建省",
          label: "龙岩市"
        },
        {
          prov: "福建省",
          label: "宁德市"
        },
        {
          prov: "江西省",
          label: "南昌市"
        },
        {
          prov: "江西省",
          label: "景德镇市"
        },
        {
          prov: "江西省",
          label: "萍乡市"
        },
        {
          prov: "江西省",
          label: "九江市"
        },
        {
          prov: "江西省",
          label: "新余市"
        },
        {
          prov: "江西省",
          label: "鹰潭市"
        },
        {
          prov: "江西省",
          label: "赣州市"
        },
        {
          prov: "江西省",
          label: "吉安市"
        },
        {
          prov: "江西省",
          label: "宜春市"
        },
        {
          prov: "江西省",
          label: "抚州市"
        },
        {
          prov: "江西省",
          label: "上饶市"
        },
        {
          prov: "山东省",
          label: "济南市"
        },
        {
          prov: "山东省",
          label: "青岛市"
        },
        {
          prov: "山东省",
          label: "淄博市"
        },
        {
          prov: "山东省",
          label: "枣庄市"
        },
        {
          prov: "山东省",
          label: "东营市"
        },
        {
          prov: "山东省",
          label: "烟台市"
        },
        {
          prov: "山东省",
          label: "潍坊市"
        },
        {
          prov: "山东省",
          label: "济宁市"
        },
        {
          prov: "山东省",
          label: "泰安市"
        },
        {
          prov: "山东省",
          label: "威海市"
        },
        {
          prov: "山东省",
          label: "日照市"
        },
        {
          prov: "山东省",
          label: "莱芜市"
        },
        {
          prov: "山东省",
          label: "临沂市"
        },
        {
          prov: "山东省",
          label: "德州市"
        },
        {
          prov: "山东省",
          label: "聊城市"
        },
        {
          prov: "山东省",
          label: "滨州市"
        },
        {
          prov: "山东省",
          label: "菏泽市"
        },
        {
          prov: "河南省",
          label: "郑州市"
        },
        {
          prov: "河南省",
          label: "开封市"
        },
        {
          prov: "河南省",
          label: "洛阳市"
        },
        {
          prov: "河南省",
          label: "平顶山市"
        },
        {
          prov: "河南省",
          label: "安阳市"
        },
        {
          prov: "河南省",
          label: "鹤壁市"
        },
        {
          prov: "河南省",
          label: "新乡市"
        },
        {
          prov: "河南省",
          label: "焦作市"
        },
        {
          prov: "河南省",
          label: "濮阳市"
        },
        {
          prov: "河南省",
          label: "许昌市"
        },
        {
          prov: "河南省",
          label: "漯河市"
        },
        {
          prov: "河南省",
          label: "三门峡市"
        },
        {
          prov: "河南省",
          label: "南阳市"
        },
        {
          prov: "河南省",
          label: "商丘市"
        },
        {
          prov: "河南省",
          label: "信阳市"
        },
        {
          prov: "河南省",
          label: "周口市"
        },
        {
          prov: "河南省",
          label: "驻马店市"
        },
        {
          prov: "河南省",
          label: "省直辖县级行政区划"
        },
        {
          prov: "湖北省",
          label: "武汉市"
        },
        {
          prov: "湖北省",
          label: "黄石市"
        },
        {
          prov: "湖北省",
          label: "十堰市"
        },
        {
          prov: "湖北省",
          label: "宜昌市"
        },
        {
          prov: "湖北省",
          label: "襄阳市"
        },
        {
          prov: "湖北省",
          label: "鄂州市"
        },
        {
          prov: "湖北省",
          label: "荆门市"
        },
        {
          prov: "湖北省",
          label: "孝感市"
        },
        {
          prov: "湖北省",
          label: "荆州市"
        },
        {
          prov: "湖北省",
          label: "黄冈市"
        },
        {
          prov: "湖北省",
          label: "咸宁市"
        },
        {
          prov: "湖北省",
          label: "随州市"
        },
        {
          prov: "湖北省",
          label: "恩施土家族苗族自治州"
        },
        {
          prov: "湖北省",
          label: "省直辖县级行政区划"
        },
        {
          prov: "湖北省",
          label: "仙桃市"
        },
        {
          prov: "湖北省",
          label: "潜江市"
        },
        {
          prov: "湖北省",
          label: "天门市"
        },
        {
          prov: "湖北省",
          label: "神农架林区"
        },
        {
          prov: "湖南省",
          label: "长沙市"
        },
        {
          prov: "湖南省",
          label: "株洲市"
        },
        {
          prov: "湖南省",
          label: "湘潭市"
        },
        {
          prov: "湖南省",
          label: "衡阳市"
        },
        {
          prov: "湖南省",
          label: "邵阳市"
        },
        {
          prov: "湖南省",
          label: "岳阳市"
        },
        {
          prov: "湖南省",
          label: "常德市"
        },
        {
          prov: "湖南省",
          label: "张家界市"
        },
        {
          prov: "湖南省",
          label: "益阳市"
        },
        {
          prov: "湖南省",
          label: "郴州市"
        },
        {
          prov: "湖南省",
          label: "永州市"
        },
        {
          prov: "湖南省",
          label: "怀化市"
        },
        {
          prov: "湖南省",
          label: "娄底市"
        },
        {
          prov: "湖南省",
          label: "湘西土家族苗族自治州"
        },
        {
          prov: "广东省",
          label: "广州市"
        },
        {
          prov: "广东省",
          label: "韶关市"
        },
        {
          prov: "广东省",
          label: "深圳市"
        },
        {
          prov: "广东省",
          label: "珠海市"
        },
        {
          prov: "广东省",
          label: "汕头市"
        },
        {
          prov: "广东省",
          label: "佛山市"
        },
        {
          prov: "广东省",
          label: "江门市"
        },
        {
          prov: "广东省",
          label: "湛江市"
        },
        {
          prov: "广东省",
          label: "茂名市"
        },
        {
          prov: "广东省",
          label: "肇庆市"
        },
        {
          prov: "广东省",
          label: "惠州市"
        },
        {
          prov: "广东省",
          label: "梅州市"
        },
        {
          prov: "广东省",
          label: "汕尾市"
        },
        {
          prov: "广东省",
          label: "河源市"
        },
        {
          prov: "广东省",
          label: "阳江市"
        },
        {
          prov: "广东省",
          label: "清远市"
        },
        {
          prov: "广东省",
          label: "东莞市"
        },
        {
          prov: "广东省",
          label: "中山市"
        },
        {
          prov: "广东省",
          label: "潮州市"
        },
        {
          prov: "广东省",
          label: "揭阳市"
        },
        {
          prov: "广东省",
          label: "云浮市"
        },
        {
          prov: "广西壮族自治区",
          label: "南宁市"
        },
        {
          prov: "广西壮族自治区",
          label: "柳州市"
        },
        {
          prov: "广西壮族自治区",
          label: "桂林市"
        },
        {
          prov: "广西壮族自治区",
          label: "梧州市"
        },
        {
          prov: "广西壮族自治区",
          label: "北海市"
        },
        {
          prov: "广西壮族自治区",
          label: "防城港市"
        },
        {
          prov: "广西壮族自治区",
          label: "钦州市"
        },
        {
          prov: "广西壮族自治区",
          label: "贵港市"
        },
        {
          prov: "广西壮族自治区",
          label: "玉林市"
        },
        {
          prov: "广西壮族自治区",
          label: "百色市"
        },
        {
          prov: "广西壮族自治区",
          label: "贺州市"
        },
        {
          prov: "广西壮族自治区",
          label: "河池市"
        },
        {
          prov: "广西壮族自治区",
          label: "来宾市"
        },
        {
          prov: "广西壮族自治区",
          label: "崇左市"
        },
        {
          prov: "海南省",
          label: "海口市"
        },
        {
          prov: "海南省",
          label: "三亚市"
        },
        {
          prov: "海南省",
          label: "三沙市"
        },
        {
          prov: "海南省",
          label: "省直辖县级行政区划"
        },
        {
          prov: "海南省",
          label: "五指山市"
        },
        {
          prov: "海南省",
          label: "琼海市"
        },
        {
          prov: "海南省",
          label: "儋州市"
        },
        {
          prov: "海南省",
          label: "文昌市"
        },
        {
          prov: "海南省",
          label: "万宁市"
        },
        {
          prov: "海南省",
          label: "东方市"
        },
        {
          prov: "海南省",
          label: "定安县"
        },
        {
          prov: "海南省",
          label: "屯昌县"
        },
        {
          prov: "海南省",
          label: "澄迈县"
        },
        {
          prov: "海南省",
          label: "临高县"
        },
        {
          prov: "海南省",
          label: "白沙黎族自治县"
        },
        {
          prov: "海南省",
          label: "昌江黎族自治县"
        },
        {
          prov: "海南省",
          label: "乐东黎族自治县"
        },
        {
          prov: "海南省",
          label: "陵水黎族自治县"
        },
        {
          prov: "海南省",
          label: "保亭黎族苗族自治县"
        },
        {
          prov: "海南省",
          label: "琼中黎族苗族自治县"
        },
        {
          prov: "重庆市",
          label: "重庆市"
        },
        {
          prov: "四川省",
          label: "成都市"
        },
        {
          prov: "四川省",
          label: "自贡市"
        },
        {
          prov: "四川省",
          label: "攀枝花市"
        },
        {
          prov: "四川省",
          label: "泸州市"
        },
        {
          prov: "四川省",
          label: "德阳市"
        },
        {
          prov: "四川省",
          label: "绵阳市"
        },
        {
          prov: "四川省",
          label: "广元市"
        },
        {
          prov: "四川省",
          label: "遂宁市"
        },
        {
          prov: "四川省",
          label: "内江市"
        },
        {
          prov: "四川省",
          label: "乐山市"
        },
        {
          prov: "四川省",
          label: "南充市"
        },
        {
          prov: "四川省",
          label: "眉山市"
        },
        {
          prov: "四川省",
          label: "宜宾市"
        },
        {
          prov: "四川省",
          label: "广安市"
        },
        {
          prov: "四川省",
          label: "达州市"
        },
        {
          prov: "四川省",
          label: "雅安市"
        },
        {
          prov: "四川省",
          label: "巴中市"
        },
        {
          prov: "四川省",
          label: "资阳市"
        },
        {
          prov: "四川省",
          label: "阿坝藏族羌族自治州"
        },
        {
          prov: "四川省",
          label: "甘孜藏族自治州"
        },
        {
          prov: "四川省",
          label: "凉山彝族自治州"
        },
        {
          prov: "贵州省",
          label: "贵阳市"
        },
        {
          prov: "贵州省",
          label: "六盘水市"
        },
        {
          prov: "贵州省",
          label: "遵义市"
        },
        {
          prov: "贵州省",
          label: "安顺市"
        },
        {
          prov: "贵州省",
          label: "毕节市"
        },
        {
          prov: "贵州省",
          label: "铜仁市"
        },
        {
          prov: "贵州省",
          label: "黔西南布依族苗族自治州"
        },
        {
          prov: "贵州省",
          label: "黔东南苗族侗族自治州"
        },
        {
          prov: "贵州省",
          label: "黔南布依族苗族自治州"
        },
        {
          prov: "云南省",
          label: "昆明市"
        },
        {
          prov: "云南省",
          label: "曲靖市"
        },
        {
          prov: "云南省",
          label: "玉溪市"
        },
        {
          prov: "云南省",
          label: "保山市"
        },
        {
          prov: "云南省",
          label: "昭通市"
        },
        {
          prov: "云南省",
          label: "丽江市"
        },
        {
          prov: "云南省",
          label: "普洱市"
        },
        {
          prov: "云南省",
          label: "临沧市"
        },
        {
          prov: "云南省",
          label: "楚雄彝族自治州"
        },
        {
          prov: "云南省",
          label: "红河哈尼族彝族自治州"
        },
        {
          prov: "云南省",
          label: "文山壮族苗族自治州"
        },
        {
          prov: "云南省",
          label: "西双版纳傣族自治州"
        },
        {
          prov: "云南省",
          label: "大理白族自治州"
        },
        {
          prov: "云南省",
          label: "德宏傣族景颇族自治州"
        },
        {
          prov: "云南省",
          label: "怒江傈僳族自治州"
        },
        {
          prov: "云南省",
          label: "迪庆藏族自治州"
        },
        {
          prov: "西藏自治区",
          label: "拉萨市"
        },
        {
          prov: "西藏自治区",
          label: "昌都地区"
        },
        {
          prov: "西藏自治区",
          label: "山南地区"
        },
        {
          prov: "西藏自治区",
          label: "日喀则地区"
        },
        {
          prov: "西藏自治区",
          label: "那曲地区"
        },
        {
          prov: "西藏自治区",
          label: "阿里地区"
        },
        {
          prov: "西藏自治区",
          label: "林芝地区"
        },
        {
          prov: "陕西省",
          label: "西安市"
        },
        {
          prov: "陕西省",
          label: "铜川市"
        },
        {
          prov: "陕西省",
          label: "宝鸡市"
        },
        {
          prov: "陕西省",
          label: "咸阳市"
        },
        {
          prov: "陕西省",
          label: "渭南市"
        },
        {
          prov: "陕西省",
          label: "延安市"
        },
        {
          prov: "陕西省",
          label: "汉中市"
        },
        {
          prov: "陕西省",
          label: "榆林市"
        },
        {
          prov: "陕西省",
          label: "安康市"
        },
        {
          prov: "陕西省",
          label: "商洛市"
        },
        {
          prov: "甘肃省",
          label: "兰州市"
        },
        {
          prov: "甘肃省",
          label: "嘉峪关市"
        },
        {
          prov: "甘肃省",
          label: "金昌市"
        },
        {
          prov: "甘肃省",
          label: "白银市"
        },
        {
          prov: "甘肃省",
          label: "天水市"
        },
        {
          prov: "甘肃省",
          label: "武威市"
        },
        {
          prov: "甘肃省",
          label: "张掖市"
        },
        {
          prov: "甘肃省",
          label: "平凉市"
        },
        {
          prov: "甘肃省",
          label: "酒泉市"
        },
        {
          prov: "甘肃省",
          label: "庆阳市"
        },
        {
          prov: "甘肃省",
          label: "定西市"
        },
        {
          prov: "甘肃省",
          label: "陇南市"
        },
        {
          prov: "甘肃省",
          label: "临夏回族自治州"
        },
        {
          prov: "甘肃省",
          label: "甘南藏族自治州"
        },
        {
          prov: "青海省",
          label: "西宁市"
        },
        {
          prov: "青海省",
          label: "海东市"
        },
        {
          prov: "青海省",
          label: "海北藏族自治州"
        },
        {
          prov: "青海省",
          label: "黄南藏族自治州"
        },
        {
          prov: "青海省",
          label: "海南藏族自治州"
        },
        {
          prov: "青海省",
          label: "果洛藏族自治州"
        },
        {
          prov: "青海省",
          label: "玉树藏族自治州"
        },
        {
          prov: "青海省",
          label: "海西蒙古族藏族自治州"
        },
        {
          prov: "宁夏回族自治区",
          label: "银川市"
        },
        {
          prov: "宁夏回族自治区",
          label: "石嘴山市"
        },
        {
          prov: "宁夏回族自治区",
          label: "吴忠市"
        },
        {
          prov: "宁夏回族自治区",
          label: "固原市"
        },
        {
          prov: "宁夏回族自治区",
          label: "中卫市"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "乌鲁木齐市"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "克拉玛依市"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "吐鲁番地区"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "哈密地区"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "昌吉回族自治州"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "博尔塔拉蒙古自治州"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "巴音郭楞蒙古自治州"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "阿克苏地区"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "克孜勒苏柯尔克孜自治州"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "喀什地区"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "和田地区"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "伊犁哈萨克自治州"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "塔城地区"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "阿勒泰地区"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "自治区直辖县级行政区划"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "石河子市"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "阿拉尔市"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "图木舒克市"
        },
        {
          prov: "新疆维吾尔自治区",
          label: "五家渠市"
        },
        {
          prov: "台湾省",
          label: "台北市"
        },
        {
          prov: "台湾省",
          label: "高雄市"
        },
        {
          prov: "台湾省",
          label: "基隆市"
        },
        {
          prov: "台湾省",
          label: "台中市"
        },
        {
          prov: "台湾省",
          label: "台南市"
        },
        {
          prov: "台湾省",
          label: "新竹市"
        },
        {
          prov: "台湾省",
          label: "嘉义市"
        },
        {
          prov: "台湾省",
          label: "省直辖"
        },
        {
          prov: "香港特别行政区",
          label: "香港岛"
        },
        {
          prov: "香港特别行政区",
          label: "九龙"
        },
        {
          prov: "香港特别行政区",
          label: "新界"
        },
        {
          prov: "澳门特别行政区",
          label: "澳门半岛"
        },
        {
          prov: "澳门特别行政区",
          label: "澳门离岛"
        },
        {
          prov: "澳门特别行政区",
          label: "无堂区划分区域"
        }
      ];
      allCity.forEach(item => {
        if (this.modeInfo.province == item.prov) {
          // console.log(val);
          tempCity.push({ label: item.label, value: item.label });
        }
      });
      this.citys = tempCity;
    }
  },
  created() {
    // 获取所有模式
    this.getModel();
  }
};
</script>
<style src="../../../style/compont/model.css" scoped></style>
