package ru.saaslike.db;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.transaction.support.TransactionSynchronizationManager;

/**
 * Интерцептор для проверки наличия активной транзакции
 */
public class TransactionCheckInterceptor implements MethodInterceptor {

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {

        if (!TransactionSynchronizationManager.isActualTransactionActive()) {
            throw new IllegalStateException(
                "\nTransaction is required.\n" +
                "You should start transaction implicitly before requesting DB. \n" +
                "It is provided by marking class or method with @Transactional");
        }

        return invocation.proceed();
    }
}
