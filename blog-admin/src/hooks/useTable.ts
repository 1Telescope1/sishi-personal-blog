import { ref, reactive, computed } from "vue";
import {notification} from "@/utils/elComponent.ts";
// 列表，分页，搜索，删除，修改状态
export function useInitTable(opt = {}) {
  let searchForm = null;
  let resetSearchForm = null;
  if (opt.searchForm) {
    searchForm = reactive({ ...opt.searchForm });
    resetSearchForm = () => {
      for (const key in opt.searchForm) {
        searchForm[key] = opt.searchForm[key];
      }
      getData();
    };
  }

  const tableData = ref([]);
  const loading = ref(false);

  // 分页
  const currentPage = ref(1);
  const total = ref(0);
  const limit = ref(10);

  // 获取数据
  function getData(p = null) {
    if (typeof p == "number") {
      currentPage.value = p;
    }

    loading.value = true;
    opt
        .getList(currentPage.value, limit.value,searchForm)
        .then((res) => {
          if (opt.onGetListSuccess && typeof opt.onGetListSuccess == "function") {
            opt.onGetListSuccess(res);
          } else {
            tableData.value = res.list;
            total.value = res.total;
          }
        })
        .finally(() => {
          loading.value = false;
        });
  }

  getData();

  // 删除
  const handleDelete = (id) => {
    loading.value = true;
    opt
        .delete(id)
        .then((res) => {
          notification("删除成功");
          getData();
        })
        .finally(() => {
          loading.value = false;
        });
  };

  // 修改状态
  const handleStatusChange = (status, row) => {
    row.statusLoading = true;
    opt
        .updateStatus(row.id, status)
        .then((res) => {
          notification("修改状态成功");
          row.status = status;
        })
        .finally(() => {
          row.statusLoading = false;
        });
  };

  // 多选选中ID
  const multiSelectionIds = ref([]);
  const handleSelectionChange = (e) => {
    multiSelectionIds.value = e.map((o) => o.id);
  };
  // 批量删除
  const multipleTableRef = ref(null);
  const handleMultiDelete = () => {
    loading.value = true;
    opt
        .delete(multiSelectionIds.value)
        .then((res) => {
          notification("删除成功");
          // 清空选中
          if (multipleTableRef.value) {
            multipleTableRef.value.clearSelection();
          }
          getData();
        })
        .finally(() => {
          loading.value = false;
        });
  };

  // 批量修改状态
  const handleMultiStatusChange = (status) => {
    loading.value = true;
    opt
        .updateStatus(multiSelectionIds.value, status)
        .then((res) => {
          notification("修改状态成功");
          // 清空选中
          if (multipleTableRef.value) {
            multipleTableRef.value.clearSelection();
          }
          getData();
        })
        .finally(() => {
          loading.value = false;
        });
  };

  return {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,
    handleStatusChange,
    handleSelectionChange,
    multipleTableRef,
    handleMultiDelete,
    handleMultiStatusChange,
    multiSelectionIds,
  };
}
