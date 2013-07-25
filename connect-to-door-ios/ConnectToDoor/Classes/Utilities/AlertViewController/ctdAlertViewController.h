//
//  ctdAlertViewController.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/18/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>

typedef enum {
    kAlertForNoConnection = 0,
    kAlertForException = 1,
    kAlertEmptyFieldEmployeeId = 2,
    kAlertInvalidEmployeeId,
    kAlertErrorAlreadyCheckIn,
    kAlertErrorAlreadyCheckOut,
    kAlertErrorEmptyDate
} typeAlert;

@protocol AlertViewDelegate <NSObject>
@required
- (void)dismissAlert;
@end

@interface ctdAlertViewController : UIViewController{
    IBOutlet UILabel *message;
    typeAlert type;
    id<AlertViewDelegate> _delegate;
}

@property (nonatomic,strong) id<AlertViewDelegate> delegate;

- (id)initViewController:(typeAlert)typeAlert andDelegate:(id)delegate;
- (void)showMessage;
- (IBAction)didOkButtonCLicked:(id)sender;
- (void)invalidate;

@end
