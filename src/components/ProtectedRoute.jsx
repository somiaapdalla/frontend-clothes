import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  // جلب بيانات المستخدم من localStorage
  const user = JSON.parse(localStorage.getItem("customer")); // أو المفتاح اللي خزنتي فيه بيانات المستخدم

  // التحقق من وجود المستخدم والتوكن والدور المطلوب
  if (!user || !user.token || (requiredRole && user.role !== requiredRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
